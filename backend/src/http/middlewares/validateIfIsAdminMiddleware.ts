import {RequestCustom} from "../types";
import {IsAdmin} from "../requestValidators";
import {NextFunction, Response} from "express";

export function ValidateIfIsAdmin(req: RequestCustom, res: Response, next: NextFunction) {
    if (!IsAdmin(req)) {
        res.status(403).json({"error": true, "msg": "Unauthorized"}).end();
        return;
    }

    next();
}
