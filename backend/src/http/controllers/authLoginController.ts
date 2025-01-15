import {Request, Response} from "express";
import dayjs from "dayjs";
import {CheckLogin, JwtSign} from "../services/AuthService";
import {AddToken} from "../services/TokensService";
import {IsProd} from "../utils";
import {TokensInsert} from "../../db/schemas/tokens";
import {v4 as uuid} from "uuid";
import {UsersSelect} from "../../db/schemas/users";

export async function LoginAuthController(req: Request, res: Response) {
    const {email, password} = req.body;

    const user = await CheckLogin(email, password) as UsersSelect;
    if (!user) {
        res.status(401).json({"error": false, "msg": "Invalid user"}).end();
        return;
    }

    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
    };

    const token: string = JwtSign(payload);
    if (token === "") {
        res.status(500).json({"error": true, "mensagem": "Internal error"}).end();
        return;
    }

    const newToken: TokensInsert = {
        id: uuid(),
        userID: user.id,
        token: token,
    }

    await AddToken(newToken)

    res.cookie("secureCookie", {"Authorization": token}, {
        secure: IsProd(),
        httpOnly: true,
        expires: dayjs().add(1, "days").toDate(),
    });

    res.json({"error": false, type: "Bearer", "token": token}).end();
}

