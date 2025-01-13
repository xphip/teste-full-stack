import { Request, Response } from "express";

export async function ListTasksController(req: Request, res: Response) {
    res.json({ "error": false, "msg": "Tasks obtidos com sucesso" });
}

export async function GetTasksController(req: Request, res: Response) {
    res.json({ "error": false, "msg": "Task obtido com sucesso" });
}

export async function CreateTasksController(req: Request, res: Response) {
    res.json({ "error": false, "msg": "Task criado com sucesso" });
}

export async function UpdateTasksController(req: Request, res: Response) {
    res.json({ "error": false, "msg": "Task atualizado com sucesso" });
}

export async function DeleteTasksController(req: Request, res: Response) {
    res.json({ "error": false, "msg": "Task deletado com sucesso" });
}
