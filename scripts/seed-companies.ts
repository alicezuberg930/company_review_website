import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  companies,
  companyBusinessTypeEnum,
  companyStatusEnum,
  type NewCompany,
} from "@/lib/db/schemas/companies";
import { eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

type CompanyJson = {
  company_name: string;
  tax_code: string;
  address: string;
  legal_representative: string;
  status: string;
  category_id: string;
  managed_by: string;
  business_type: string;
  phone: string;
  active_date: string;
};

type CompanyBusinessType = (typeof companyBusinessTypeEnum.enumValues)[number];

const businessTypeAliases: Record<string, CompanyBusinessType> = {
  "cong-ty-co-phan-ngoai-nn": "cong-ty-co-phan",
  "cong-ty-tnhh-1-thanh-vien-ngoai-nn": "cong-ty-tnhh-1-thanh-vien",
  "cong-ty-tnhh-2-thanh-vien-tro-len-ngoai-nn":
    "cong-ty-tnhh-2-thanh-vien-tro-len",
};

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function requiredString(value: unknown, field: keyof CompanyJson, index: number) {
  if (typeof value !== "string" || !value.trim()) {
    throw new TypeError(
      `Invalid company at index ${index}: ${field} must be a non-empty string`,
    );
  }
  return value.trim();
}

function enumValue<T extends string>(
  label: string,
  values: readonly T[],
  field: "status" | "business_type",
  index: number,
  aliases: Record<string, T> = {},
) {
  const slug = slugify(label);
  const value = aliases[slug] ?? values.find((candidate) => candidate === slug);
  if (!value) {
    throw new TypeError(
      `Invalid company at index ${index}: unsupported ${field} "${label}"`,
    );
  }
  return value;
}

function normalizeCompany(value: unknown, index: number): NewCompany {
  if (typeof value !== "object" || value === null) {
    throw new TypeError(`Invalid company at index ${index}: expected an object`);
  }

  const input = value as Record<string, unknown>;
  const activeDateText = requiredString(input.active_date, "active_date", index);
  const activeDate = new Date(`${activeDateText}T00:00:00.000Z`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(activeDateText) ||
    Number.isNaN(activeDate.getTime()) ||
    activeDate.toISOString().slice(0, 10) !== activeDateText
  ) {
    throw new TypeError(
      `Invalid company at index ${index}: active_date must be a valid YYYY-MM-DD date`,
    );
  }

  const statusLabel = requiredString(input.status, "status", index);
  const businessTypeLabel = requiredString(
    input.business_type,
    "business_type",
    index,
  );

  return {
    companyName: requiredString(input.company_name, "company_name", index),
    taxCode: requiredString(input.tax_code, "tax_code", index),
    address: requiredString(input.address, "address", index),
    legalRepresentative: requiredString(
      input.legal_representative,
      "legal_representative",
      index,
    ),
    status: enumValue(
      statusLabel,
      companyStatusEnum.enumValues,
      "status",
      index,
    ),
    categoryId: requiredString(input.category_id, "category_id", index),
    managedBy: requiredString(input.managed_by, "managed_by", index),
    businessType: enumValue(
      businessTypeLabel,
      companyBusinessTypeEnum.enumValues,
      "business_type",
      index,
      businessTypeAliases,
    ),
    phone: requiredString(input.phone, "phone", index),
    activeDate,
  };
}

async function main() {
  const connectionString = process.env.POSTGRES_URL;
  if (!connectionString) throw new Error("POSTGRES_URL is not set");

  const companiesPath = resolve("scripts/companies.json");
  const companyJson: unknown = JSON.parse(await readFile(companiesPath, "utf8"));
  if (!Array.isArray(companyJson)) {
    throw new TypeError("companies.json must contain an array");
  }

  const normalizedCompanies = companyJson.map(normalizeCompany);
  const uniqueCompanies = [
    ...new Map(
      normalizedCompanies.map((company) => [company.taxCode, company]),
    ).values(),
  ];
  const client = postgres(connectionString, { prepare: false });
  const db = drizzle(client);

  try {
    const taxCodes = uniqueCompanies.map((company) => company.taxCode);
    const existing = taxCodes.length
      ? await db
        .select({ taxCode: companies.taxCode })
        .from(companies)
        .where(inArray(companies.taxCode, taxCodes))
      : [];
    const existingTaxCodes = new Set(existing.map(({ taxCode }) => taxCode));
    const toInsert = uniqueCompanies.filter(
      ({ taxCode }) => !existingTaxCodes.has(taxCode),
    );
    const toUpdate = uniqueCompanies.filter(({ taxCode }) =>
      existingTaxCodes.has(taxCode),
    );

    await db.transaction(async (tx) => {
      if (toInsert.length) await tx.insert(companies).values(toInsert);
      for (const company of toUpdate) {
        await tx
          .update(companies)
          .set({ ...company, updatedAt: new Date() })
          .where(eq(companies.taxCode, company.taxCode));
      }
    });

    console.log(
      `Imported ${uniqueCompanies.length} companies (${toInsert.length} inserted, ${toUpdate.length} updated).`,
    );
  } finally {
    await client.end();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
