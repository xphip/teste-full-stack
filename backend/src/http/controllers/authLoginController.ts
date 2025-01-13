import { Request, Response } from "express";
import dayjs from "dayjs";
import {CheckLogin, JwtSign} from "../services/AuthService";
import {AddToken} from "../services/UpdateToken";
import {IsProd} from "../utils";

export async function LoginAuthController(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await CheckLogin(username, password);

    if (user) {
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        };

        const token: string = JwtSign(payload);

        if (token === "") {
            res.status(500).json({ "error": true, "mensagem": "Internal error" }).end();
            return;
        }

        await AddToken(user._id, token)

        res.cookie("secureCookie", { "Authorization": token }, {
            secure: IsProd(),
            httpOnly: true,
            expires: dayjs().add(1, "days").toDate(),
        });

        res.json({ "error": false, type: "Bearer", "token": token }).end();
    } else {
        res.status(401).json({ "error": false, "msg": "Unauthorized" }).end();
    }
}

