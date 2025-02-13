import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { DB_HOST, DB_PASSWORD, DB_PORT, DB_SCHEMA, DB_USER } from "../config";
import {schema} from "./schemas/schema";

export const connectionString: string = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_SCHEMA}`;

const pool = postgres(connectionString, { ssl: false });
const db = drizzle(pool, {...schema, casing: "snake_case" }, );

db.execute("select 1");

export default db;
