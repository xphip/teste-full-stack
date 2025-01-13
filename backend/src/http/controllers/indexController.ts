import { Request, Response } from "express";

export async function IndexController(req: Request, res: Response) {
    res.json({ "error": false, "msg": "it's all fine" }).end();
}
