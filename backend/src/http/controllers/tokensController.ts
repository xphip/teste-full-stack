import { Request, Response } from "express";

export async function GetTokensController(req: Request, res: Response) {
    res.json({ "error": false, "msg": "Token obtido com sucesso" });
}

export async function CreateTokensController(req: Request, res: Response) {
    res.json({ "error": false, "msg": "Token criado com sucesso" });
}

export async function DeleteTokensController(req: Request, res: Response) {
    res.json({ "error": false, "msg": "Token deletado com sucesso" });
}
