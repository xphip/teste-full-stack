import * as t from "drizzle-orm/pg-core";
import { timestampsFields } from "./columns.helpers";
import { usersSchema } from "./users";
import {schema} from "./schema";

export const tokensSchema = schema.table("tokens", {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: t.integer().notNull(),
    token: t.text().notNull(),
    ...timestampsFields,
}, (table) => [
    t.uniqueIndex("tokens_token_idx").on(table.token),
    t.foreignKey({
        name: "user_id_fk",
        columns: [table.userId],
        foreignColumns: [usersSchema._id],
    }),
]);

export type TokensSelect = typeof tokensSchema.$inferSelect;
export type TokensInsert = typeof tokensSchema.$inferInsert;
