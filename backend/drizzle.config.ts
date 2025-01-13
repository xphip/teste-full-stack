import { defineConfig } from "drizzle-kit";
import type { Config } from "drizzle-kit";
import { connectionString } from "./src/db";

export default defineConfig({
    dbCredentials: {
        url: connectionString,
    },
    dialect: "postgresql",
    schema: "./src/db/schemas",
    out: "./src/db/migrations",
    casing: "snake_case",
}) as Config;
