import { Response, NextFunction } from "express";
import { VerifyErrors } from "jsonwebtoken";
import {RequestCustom, SessionType, SessionTypeProp} from "../types";
import {CheckValidSession} from "../services/AuthService";

export function ValidateAuth(req: RequestCustom, res: Response, next: NextFunction) {
    CheckValidSession(req, (err: VerifyErrors | null, session: SessionTypeProp) => {
        if (err) {
            res.status(403).json({ "error": true, "msg": "Unauthorized" });
            return;
        }
        req.session = session as SessionType;
        next();
    });
}
