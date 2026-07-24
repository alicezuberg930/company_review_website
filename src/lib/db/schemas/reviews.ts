import { createId } from "@/lib/create-cuid";
import { categories } from "@/lib/db/schemas/categories";
import { relations } from "drizzle-orm";
import { numeric, date, pgEnum, pgTable, timestamp, varchar, boolean, text, AnyPgColumn } from "drizzle-orm/pg-core";
import { companies } from "./companies";

export const reviews = pgTable("reviews", {
    id: varchar({ length: 36 }).primaryKey().notNull().$defaultFn(() => createId()),
    companyName: varchar("company_name", { length: 255 }).notNull(),
    parentReviewId: varchar("parent_review_id", { length: 36 })
        .references((): AnyPgColumn => reviews.id),
    isDeleted: boolean('is_deleted'),
    companyId: varchar("company_id", { length: 36 })
        .notNull()
        .references(() => companies.id),
    content: text("content"),
    score: numeric("score"),
    displayName: varchar("display_name", { length: 36 }),

    updatedAt: timestamp("updated_at", { withTimezone: true })
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
    company: one(companies, {
        fields: [reviews.companyId],
        references: [companies.id],
    }),
}));