import { pgSchema, timestamp } from "drizzle-orm/pg-core";
import { DB_SCHEMA } from "../../config";

export const schema = pgSchema(DB_SCHEMA);

export const timestampsFields = {
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp(),
  deleted_at: timestamp(),
}

