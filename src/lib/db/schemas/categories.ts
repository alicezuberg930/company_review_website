import { createId } from "@/lib/create-cuid";
import { date, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
    id: varchar({ length: 36 }).primaryKey().notNull().$defaultFn(() => createId()),
    name: varchar("name", { length: 255 }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;