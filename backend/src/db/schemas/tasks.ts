import * as t from "drizzle-orm/pg-core";
import { usersSchema } from "./users";
import { schema, timestampsFields } from "./columns.helpers";

export const tasksSchema = schema.table("tasks", {
    _id: t.integer("_id").primaryKey().generatedAlwaysAsIdentity(),
    id: t.integer().notNull(),
    title: t.varchar({ length: 256 }).notNull(),
    isCompleted: t.boolean().notNull(),
    description: t.varchar({ length: 500 }),
    userId: t.integer().notNull(),
    ...timestampsFields,
}, (table) => [
    t.uniqueIndex("tasks_id_idx").on(table.id),
    t.foreignKey({
        name: "user_id_fk",
        columns: [table.userId],
        foreignColumns: [usersSchema._id],
    }),
]);

export type TasksSelect = typeof tasksSchema.$inferSelect;
export type TasksInsert = typeof tasksSchema.$inferInsert;
