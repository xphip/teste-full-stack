import * as t from "drizzle-orm/pg-core";
import { usersSchema } from "./users";
import { timestampsFields } from "./columns.helpers";
import {schema} from "./schema";
import {getTableColumns} from "drizzle-orm";

export const tasksSchema = schema.table("tasks", {
    _id: t.integer("_id").primaryKey().generatedAlwaysAsIdentity(),
    id: t.varchar({ length: 256 }).unique().notNull(),
    title: t.varchar({ length: 256 }).notNull(),
    isCompleted: t.boolean().notNull(),
    description: t.varchar({ length: 500 }),
    userID: t.varchar({ length: 256 }).notNull().references(() =>
        usersSchema.id, {onDelete: "cascade"}),
    ...timestampsFields,
}, (table) => [
    t.uniqueIndex("tasks_id_idx").on(table.id),
    t.index("tasks_is_completed_idx").on(table.id),
    t.foreignKey({
        name: "user_id_fk",
        columns: [table.userID],
        foreignColumns: [usersSchema.id],
    }),
]);

export const TasksUnsafeFields = getTableColumns(tasksSchema);
const {_id, deleted_at, ...safeFields} = TasksUnsafeFields;
export const TasksSafeFields = safeFields;
export type TasksSafeFieldsType = typeof TasksSafeFields;
export type TasksUnsafeFieldsType = typeof TasksUnsafeFields;

export type TasksSelect = typeof tasksSchema.$inferSelect;
export type TasksInsert = typeof tasksSchema.$inferInsert;
