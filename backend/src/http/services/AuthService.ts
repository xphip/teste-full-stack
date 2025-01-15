import {UsersInsert, UsersSelect, UsersUnsafeFieldsType} from "../../db/schemas/users";
import {ComparePassword} from "../utils";
import jwt, {SignOptions} from "jsonwebtoken";
import {APP_SECRET} from "../../config";
import {RequestCustom} from "../types";
import jwtService from "jsonwebtoken";
import {GetUsersByEmail} from "../../db/models/usersModel";

export async function CheckLogin(email: string, password: string) {
    const users = await GetUsersByEmail(email) as UsersInsert[];

    if (!users || users?.length === 0) {
        return null;
    }

    const user = users[0];

    if (!await ComparePassword(password, user.password)) {
        return null;
    }
    return user;
}

export async function CheckRegister(email: string) {
    const users = await GetUsersByEmail(email);

    if (users?.length === 0) {
        return undefined;
    }

    return users[0];
}

export function CheckValidSession(req: RequestCustom, callback: jwtService.VerifyCallback<jwtService.JwtPayload | string>) {
    // TODO: check on database
    req.session = req.session || {};
    const jwt: string = req.headers?.authorization?.replace("Bearer ", "") || "";
    const privateKey: string = APP_SECRET || "";
    jwtService.verify(jwt, privateKey, callback);
}

export function JwtSign(payload: any) {
    const options: SignOptions = {expiresIn: "1d"};
    const token: string = jwt.sign(payload, APP_SECRET, options);
    return token;
}
