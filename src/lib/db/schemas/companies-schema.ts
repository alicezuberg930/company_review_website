import { createId } from "@/lib/create-cuid";
import { date, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const companies = pgTable("companies", {
  id: varchar({ length: 36 }).primaryKey().notNull().$defaultFn(() => createId()),
  companyName: varchar("company_name", { length: 255 }).notNull(),
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
});

export type Company = typeof companies.$inferSelect;
export type NewCompany = typeof companies.$inferInsert;