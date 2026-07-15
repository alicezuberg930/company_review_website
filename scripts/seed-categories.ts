import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { categories, type NewCategory } from "@/lib/db/schemas/categories-schema";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

type CategoryJson = {
  id: string;
  name: string;
};

async function main() {
  const connectionString = process.env.POSTGRES_URL;

  if (!connectionString) {
    throw new Error("POSTGRES_URL is not set");
  }

  const categoriesPath = resolve("scripts/categories.json");
  const categoryJson: unknown = JSON.parse(
    await readFile(categoriesPath, "utf8"),
  );

  if (!Array.isArray(categoryJson)) {
    throw new TypeError("categories.json must contain an array");
  }

  const normalizedCategories: CategoryJson[] = categoryJson.map(
    (category: unknown, index) => {
      if (
        typeof category !== "object" ||
        category === null ||
        !("id" in category) ||
        !("name" in category) ||
        typeof category.id !== "string" ||
        typeof category.name !== "string" ||
        !category.id.trim() ||
        !category.name.trim()
      ) {
        throw new TypeError(
          `Invalid category at index ${index}: expected non-empty id and name strings`,
        );
      }

      return {
        id: category.id.trim(),
        name: category.name.trim(),
      };
    },
  );

  const uniqueCategories: NewCategory[] = [
    ...new Map(
      normalizedCategories.map((category) => [category.id, category]),
    ).values(),
  ];

  const client = postgres(connectionString, { prepare: false });
  const db = drizzle(client);

  try {
    if (uniqueCategories.length > 0) {
      await db
        .insert(categories)
        .values(uniqueCategories)
        .onConflictDoUpdate({
          target: categories.id,
          set: {
            name: sql`excluded.name`,
            updatedAt: new Date(),
          },
        });
    }

    console.log(`Imported ${uniqueCategories.length} categories.`);
  } finally {
    await client.end();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
