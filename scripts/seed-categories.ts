import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { categories, type NewCategory } from "@/lib/db/schemas/categories";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

async function main() {
  const connectionString = process.env.POSTGRES_URL;

  if (!connectionString) {
    throw new Error("POSTGRES_URL is not set");
  }

  const categoriesPath = resolve("scripts/categories.json");
  const categoryJson = JSON.parse(
    await readFile(categoriesPath, "utf8"),
  ) as Record<string, any>

  if (!Array.isArray(categoryJson)) {
    throw new TypeError("categories.json must contain an array");
  }

  const normalizedCategories = categoryJson.map(
    (category, index) => {
      if (
        typeof category !== "object" ||
        category === null ||
        !("business_code" in category) ||
        !("business_name" in category) ||
        typeof category.business_code !== "number" ||
        typeof category.business_name !== "string"
      ) {
        throw new TypeError(
          `Invalid category at index ${index}: expected non-empty `,
        );
      }

      return {
        id: category.business_code,
        name: category.business_name,
      };
    },
  );

  const client = postgres(connectionString, { prepare: false });
  const db = drizzle(client);

  try {
    if (normalizedCategories.length > 0) {
      await db
        .insert(categories)
        .values(normalizedCategories)
        .onConflictDoUpdate({
          target: categories.id,
          set: {
            name: sql`excluded.name`,
            updatedAt: new Date(),
          },
        });
    }

    console.log(`Imported ${normalizedCategories.length} categories.`);
  } finally {
    await client.end();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
