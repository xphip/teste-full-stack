import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.resolve("../.env")});

if (!process?.env) {
    throw new Error("Interal error. No environment variable is set.");
}

if (!process.env.APP_SECRET) {
    throw new Error("APP_SECRET environment variable is required");
}

if (!process.env.APP_ENV) {
    throw new Error("APP_ENV environment variable is required");
}

export const APP_ENV: string = process.env.APP_ENV || "dev";
export const APP_SECRET: string = process.env.APP_SECRET || "";
export const APP_SECRET_SALT: number = parseInt(process.env.APP_SECRET_SALT || "10");

export const SERVER_URL: string = process.env.SERVER_URL || "http://localhost";
export const SERVER_PORT: string = process.env.SERVER_PORT || "8080";

export const DB_HOST: string = process.env.DB_HOST || "localhost";
export const DB_PORT: number = parseInt(process.env.DB_PORT || "5432");
export const DB_SCHEMA: string = process.env.DB_SCHEMA || "postgres";
export const DB_USER: string = process.env.DB_USER || "root";
export const DB_PASSWORD: string = process.env.DB_PASSWORD || "";

