import {Request, Response} from "express";
import {RefreshToken} from "../services/TokensService";
import {IsProd, ParseToken} from "../utils";
import dayjs from "dayjs";

export async function GetTokensController(req: Request, res: Response) {
    res.json({"error": false, "msg": "Token obtido com sucesso"}).end();
}

export async function RefreshTokensController(req: Request, res: Response) {
    const parsedToken = ParseToken(req?.headers?.authorization);

    const newToken = await RefreshToken(parsedToken)
    if (!newToken) {
        res.status(500).json({"error": true, "mensagem": "Internal error"}).end();
        return;
    }

    res.cookie("secureCookie", {"Authorization": newToken}, {
        secure: IsProd(),
        httpOnly: true,
        expires: dayjs().add(1, "days").toDate(),
    });

    res.json({"error": false, type: "Bearer", "token": newToken}).end();
}

export async function CreateTokensController(req: Request, res: Response) {
    res.json({"error": false, "msg": "Token criado com sucesso"}).end();
}

export async function DeleteTokensController(req: Request, res: Response) {
    res.json({"error": false, "msg": "Token deletado com sucesso"}).end();
}
