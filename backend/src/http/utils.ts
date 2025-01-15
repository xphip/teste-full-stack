import bcrypt from "bcrypt";
import {APP_ENV, APP_SECRET_SALT} from "../config";
import {v4 as uuid} from "uuid";
import jwtService from "jsonwebtoken";
import {SessionType} from "./types";

const SALT = APP_SECRET_SALT;

export function ParseToken(token: string | undefined) {
    return token?.replace("Bearer ", "") || "";
}

export async function HashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT);
}

export async function ComparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

export function IsProd(): boolean {
    return APP_ENV === "PROD"
}

export function GetUUID() {
    return uuid();
}
