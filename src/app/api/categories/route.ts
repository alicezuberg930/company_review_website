import { categories, db } from "@/lib/db";
import { asc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

function getCategoryName(body: unknown): string | null {
  if (
    typeof body !== "object" ||
    body === null ||
    !("name" in body) ||
    typeof body.name !== "string"
  ) {
    return null;
  }

  const name = body.name.trim();
  return name.length > 0 && name.length <= 255 ? name : null;
}

export async function GET() {
  const result = await db.select().from(categories).orderBy(asc(categories.name));

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = getCategoryName(body);

  if (!name) {
    return NextResponse.json(
      { error: "name must be a non-empty string of at most 255 characters" },
      { status: 400 },
    );
  }

  const [category] = await db.insert(categories).values({ name }).returning();

  return NextResponse.json(category, { status: 201 });
}
