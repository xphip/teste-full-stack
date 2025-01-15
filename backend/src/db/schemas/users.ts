import * as t from "drizzle-orm/pg-core";
import { timestampsFields } from "./columns.helpers";
import { pgEnum } from "drizzle-orm/pg-core";
import {schema} from "./schema";
import {getTableColumns} from "drizzle-orm";

export const rolesEnum = pgEnum("role", ["user", "admin"]);

export const usersSchema = schema.table("users", {
    _id: t.integer("_id").primaryKey().generatedAlwaysAsIdentity(),
    id: t.varchar({ length: 256 }).unique().notNull(),
    firstName: t.varchar({ length: 50 }),
    lastName: t.varchar({ length: 50 }),
    username: t.varchar({ length: 100 }).notNull(),
    email: t.varchar({ length: 254 }).notNull(),
    password: t.varchar({ length: 256 }).notNull(),
    role: rolesEnum().notNull().default("user"),
    ...timestampsFields,
}, (table) => [
    t.uniqueIndex("users_id_idx").on(table.id),
    t.uniqueIndex("users_email_idx").on(table.email),
]);


export const UsersUnsafeFields = getTableColumns(usersSchema);
const {_id, password, deleted_at, ...safeFields} = UsersUnsafeFields;
export const UsersSafeFields = safeFields;
export type UsersSafeFieldsType = typeof UsersSafeFields;
export type UsersUnsafeFieldsType = typeof UsersUnsafeFields;

export type UsersSelect = typeof usersSchema.$inferSelect;
export type UsersInsert = typeof usersSchema.$inferInsert;
