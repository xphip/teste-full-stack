import {Request, Response} from "express";
import dayjs from "dayjs";
import {GetUUID, HashPassword, IsProd} from "../utils";
import {UsersInsert} from "../../db/schemas/users";
import {CreateUser} from "../../db/models/usersModel";
import {CheckRegister, JwtSign} from "../services/AuthService";


export async function RegisterAuthController(req: Request, res: Response) {
    const {username, password} = req.body;

    const userExist = await CheckRegister(username);
    if (userExist) {
        res.status(409).json({"error": false, "msg": "User already exist"}).end();
    }

    const id = GetUUID();

    const payload = {
        id: id,
        username: username,
        email: username,
        role: "user",
    };

    const user: UsersInsert = {
        id: id,
        username: username,
        email: username,
        password: await HashPassword(password)
    };

    await CreateUser(user);

    const token: string = JwtSign(payload)

    if (token === "") {
        res.status(500).json({"error": true, "mensagem": "Internal error"}).end();
        return;
    }

    res.cookie("secureCookie", {"Authorization": token}, {
        secure: IsProd(),
        httpOnly: true,
        expires: dayjs().add(1, "days").toDate(),
    });

    res.json({"error": false, type: "Bearer", "token": token}).end();

}
