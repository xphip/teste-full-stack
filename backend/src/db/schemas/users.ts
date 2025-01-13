import * as t from "drizzle-orm/pg-core";
import { schema, timestampsFields } from "./columns.helpers";
import { pgEnum } from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("role", ["user", "admin"]);

export const usersSchema = schema.table("users", {
    _id: t.integer("_id").primaryKey().generatedAlwaysAsIdentity(),
    id: t.varchar({ length: 256 }).notNull(),
    firstName: t.varchar({ length: 50 }),
    lastName: t.varchar({ length: 50 }),
    username: t.varchar({ length: 100 }).unique().notNull(),
    email: t.varchar({ length: 256 }).notNull(),
    password: t.varchar({ length: 256 }).notNull(),
    role: rolesEnum().notNull().default("user"),
    ...timestampsFields,
}, (table) => [
    t.uniqueIndex("email_idx").on(table.email),
    t.uniqueIndex("username_idx").on(table.username),
]);

export type UsersSelect = typeof usersSchema.$inferSelect;
export type UsersInsert = typeof usersSchema.$inferInsert;
