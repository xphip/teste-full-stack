import db from "../../db";
import {usersSchema, UsersSelect} from "../../db/schemas/users";
import {eq} from "drizzle-orm";
import {ComparePassword} from "../utils";
import jwt, {SignOptions} from "jsonwebtoken";
import {APP_SECRET} from "../../config";
import {RequestCustom} from "../types";
import jwtService from "jsonwebtoken";

export async function CheckLogin(username: string, password: string): Promise<UsersSelect | undefined> {
    const users: UsersSelect[] = await db
        .select()
        .from(usersSchema)
        .where(eq(usersSchema.email, username))
        .limit(1)
        .execute()

    if (users?.length === 0) {
        return undefined;
    }

    const user: UsersSelect = users[0];

    if (await ComparePassword(password, user.password)) {
        return user;
    } else {
        return undefined;
    }
}

export async function CheckRegister(username: string): Promise<UsersSelect | undefined> {
    const users: UsersSelect[] = await db
        .select()
        .from(usersSchema)
        .where(eq(usersSchema.email, username))
        .limit(1)
        .execute()

    if (users?.length === 0) {
        return undefined;
    }

    return users[0];
}

export function CheckValidSession(req: RequestCustom, callback:  jwtService.VerifyCallback<jwtService.JwtPayload | string>) {
    req.session = req.session || {};
    const jwt: string = req.headers["authorization"]?.replace("Bearer ", "") || "";
    const privateKey: string = APP_SECRET || "";
    jwtService.verify(jwt, privateKey, callback);
}


export function JwtSign(payload: any) {
    const options: SignOptions = {expiresIn: "1d"};
    const token: string = jwt.sign(payload, APP_SECRET, options);
    return token;
}
