import { Request, Response } from "express";
import {
    CreateUsersModel,
    DeleteUsersModel,
    GetUsersModel,
    ListUsersModel,
    UpdateUsersModel
} from "../../db/models/usersModel";
import { UsersInsert } from "../../db/schemas/users";
import {RequestCustom} from "../types";
import {GetUUID} from "../utils";


export async function ListUsersController(req: Request, res: Response) {
    const users = await ListUsersModel();
    res.json({ "error": false, "msg": "", "data": users });
}

export async function GetUsersController(req: Request, res: Response) {
    const users = await GetUsersModel(req.params.id);
    res.json({ "error": false, "msg": "", "data": users });
}

export async function CreateUsersController(req: Request, res: Response) {
    const user: UsersInsert = {
        id: GetUUID(),
        username: req.body.username,
        email: req.body.username,
        password: req.body.password,
    };
    const result = await CreateUsersModel(user);
    res.json({ "error": false, "msg": "", "data": result });
}

export async function UpdateUsersController(req: RequestCustom, res: Response) {
    const user: UsersInsert = req.body satisfies UsersInsert;
    const result = await UpdateUsersModel(user);
    res.json({ "error": false, "msg": "", "data": result });
}

export async function DeleteUsersController(req: RequestCustom, res: Response) {
    const result = await DeleteUsersModel(req.params.id);
    res.json({ "error": false, "msg": "", "data": result });
}
