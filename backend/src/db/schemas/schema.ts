import {pgSchema} from "drizzle-orm/pg-core";
import {DB_SCHEMA} from "../../config";

export const schema = pgSchema(DB_SCHEMA);
