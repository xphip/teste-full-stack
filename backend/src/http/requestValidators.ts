import {RequestCustom, SessionType} from "./types";

export function IsOwnership(req: RequestCustom) {
    const session = req?.session as SessionType;
    return session?.id === req?.params?.id;
}

export function IsAdmin(req: RequestCustom) {
    const session = req?.session as SessionType;
    return session?.role === "admin";
}
