import {RequestCustom} from "../types";
import {IsAdmin, IsOwnership} from "../requestValidators";
import {NextFunction, Response} from "express";

export function ValidateOwnership(req: RequestCustom, res: Response, next: NextFunction) {
    if (IsOwnership(req) || IsAdmin(req)) {
        next();
    } else {
        res.status(403).json({"error": true, "msg": "Unauthorized"}).end();
    }
}
