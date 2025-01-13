import {RequestCustom, SessionType} from "./types";

export function IsOwnership(req: RequestCustom) {
    const session = req?.session as SessionType;
    return !(session.role !== "admin" || session.id !== req.body.id);
}
