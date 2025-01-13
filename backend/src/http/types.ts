import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type SessionTypeProp = string | SessionType | JwtPayload | undefined;

export interface SessionType {
    id: string;
    username: string;
    email: string;
    role: string;
}

export type RequestCustom = Request & {session?: SessionTypeProp};
