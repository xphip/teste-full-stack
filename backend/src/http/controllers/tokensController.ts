import {Request, Response} from "express";
import {RefreshToken} from "../services/TokensService";
import {IsProd, ParseToken} from "../utils";
import dayjs from "dayjs";
import {CreateToken, ListTokens} from "../../db/models/tokensModel";
import {TokensInsert} from "../../db/schemas/tokens";
import {v4 as uuid} from "uuid";
import {RequestCustom, SessionType} from "../types";

export async function GetTokensController(req: Request, res: Response) {
    const offset: number | null = req?.query?.offset ? parseInt(<string>req?.query?.offset) : 0;
    const tokens = await ListTokens(offset)

    res.json({"error": false, "msg": "", data: tokens}).end();
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

    res.json({"error": false, "msg": "Token criado com sucesso", "type": "Bearer", "token": newToken}).end();
}

export async function DeleteTokensController(req: Request, res: Response) {
    res.json({"error": false, "msg": "Token deletado com sucesso"}).end();
}
