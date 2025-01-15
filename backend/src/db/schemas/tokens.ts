import * as t from "drizzle-orm/pg-core";
import {timestampsFields} from "./columns.helpers";
import {usersSchema} from "./users";
import {schema} from "./schema";
import {getTableColumns} from "drizzle-orm";

export const tokensSchema = schema.table("tokens", {
    _id: t.integer("_id").primaryKey().generatedAlwaysAsIdentity(),
    id: t.varchar({length: 256}).notNull(),
    userID: t.varchar({length: 256}).notNull().references(() =>
        usersSchema.id, {onDelete: "cascade"}),
    token: t.text().notNull(),
    ...timestampsFields,
}, (table) => [
    t.uniqueIndex("tokens_id_idx").on(table.token),
    t.uniqueIndex("tokens_token_idx").on(table.token),
    t.foreignKey({
        name: "user_id_fk",
        columns: [table.userID],
        foreignColumns: [usersSchema.id],
    }),
]);

export const TokensUnsafeFields = getTableColumns(tokensSchema);
const {_id, deleted_at, ...safeFields} = TokensUnsafeFields;
export const TokensSafeFields = safeFields;
export type TokensSafeFieldsType = typeof TokensSafeFields;
export type TokensUnsafeFieldsType = typeof TokensUnsafeFields;


export type TokensSelect = typeof tokensSchema.$inferSelect;
export type TokensInsert = typeof tokensSchema.$inferInsert;
