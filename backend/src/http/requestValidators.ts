import {RequestCustom, SessionType} from "./types";

export function IsOwnership(req: RequestCustom) {
    const session = req?.session as SessionType;
    return !(IsAdmin(req) || session.id !== req.body.id);
}

export function IsAdmin(req: RequestCustom) {
    const session = req?.session as SessionType;
    return !(session.role !== "admin");
}
