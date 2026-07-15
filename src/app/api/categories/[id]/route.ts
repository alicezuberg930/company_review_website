import { categories, db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

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

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const [category] = await db
    .select()
    .from(categories)
    .where(eq(categories.id, id))
    .limit(1);

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  return NextResponse.json(category);
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
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

  const [category] = await db
    .update(categories)
    .set({ name })
    .where(eq(categories.id, id))
    .returning();

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  return NextResponse.json(category);
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const [category] = await db
    .delete(categories)
    .where(eq(categories.id, id))
    .returning();

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  return NextResponse.json(category);
}
