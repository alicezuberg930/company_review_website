import { createId } from "@/lib/create-cuid";
import { categories } from "@/lib/db/schemas/categories";
import { relations } from "drizzle-orm";
import { numeric, date, pgEnum, pgTable, timestamp, varchar, boolean } from "drizzle-orm/pg-core";

export const companyStatusEnum = pgEnum("company_status", [
  "ngung-hoat-dong-nhung-chua-hoan-thanh-thu-tuc-dong-mst",
  "dang-hoat-dong-duoc-cap-thong-bao-mst",
  "dang-hoat-dong",
  "tam-nghi-kinh-doanh-co-thoi-han",
  "ngung-hoat-dong-va-da-dong-mst",
  "da-chuyen-co-quan-thue-quan-ly",
]);

export const companyBusinessTypeEnum = pgEnum("company_business_type", [
  "cong-ty-tnhh-1-thanh-vien",
  "cong-ty-tnhh-2-thanh-vien-tro-len",
  "cong-ty-co-phan",
  "doanh-nghiep-tu-nhan",
  "cong-ty-hop-doanh",
  "ho-kinh-doanh-ca-the",
  "cac-to-chuc-kinh-te-khac",
  "dn-lien-doanh-voi-nuoc-ngoai",
  "to-chuc-ca-nhan-nuoc-ngoai-khac",
  "chi-nhanh-dn-nuoc-ngoai",
  "cac-co-quan-dai-dien-ngoai-giao-to-chuc-quoc-te-tai-viet-nam",
  "dn-100-von-nuoc-ngoai",
  "cong-ty-co-phan-nn",
  "dn-100-von-nha-nuoc",
  "hop-tac-xa",
  "don-vi-hanh-chinh-su-nghiep",
  "cong-ty-tnhh-nn-1-thanh-vien",
  "cong-ty-tnhh-nn-2-tv-tro-len",
  "to-hop-tac",
  "doanh-nghiep-nha-nuoc-lien-doanh-voi-nuoc-ngoai",
  "to-chuc-kinh-te-cua-to-chuc-ct-ct-xh-xh-xh-nn",
]);

export const companies = pgTable("companies", {
  id: varchar({ length: 36 }).primaryKey().notNull().$defaultFn(() => createId()),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  categoryId: varchar("category_id", { length: 36 })
    .notNull()
    .references(() => categories.id),
  status: companyStatusEnum("status").notNull(),
  businessType: companyBusinessTypeEnum("business_type").notNull(),
  taxCode: varchar("tax_code", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  legalRepresentative: varchar("legal_representative", { length: 255 }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  managedBy: varchar("managed_by", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
  activeDate: date("active_date", { mode: "date" }).notNull(),
  // extra informations
  email: varchar("email", { length: 255 }),
  smallestSize: numeric("smallest_size"),
  biggestSize: numeric("biggest_size"),
  logo: varchar("logo", { length: 255 }),
  website: varchar("website", { length: 255 }),
  averageScore: numeric("average_score"),
  isDeleted: boolean('is_deleted'),
});

export const companiesRelations = relations(companies, ({ one }) => ({
  category: one(categories, {
    fields: [companies.categoryId],
    references: [categories.id],
  }),
}));

export type Company = typeof companies.$inferSelect;
export type NewCompany = typeof companies.$inferInsert;