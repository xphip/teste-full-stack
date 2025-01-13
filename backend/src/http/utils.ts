import bcrypt from "bcrypt";
import {APP_ENV} from "../config";
import { v4 as uuid } from "uuid";

const SALT = 10;

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
