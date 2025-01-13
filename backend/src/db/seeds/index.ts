import {CreateUsersModel} from "../models/usersModel";
import {UsersInsert} from "../schemas/users";
import {v4 as uuid} from "uuid";

async function main() {
    const user: UsersInsert = {
        id: uuid(),
        username: "admin",
        email: "admin@localhost",
        password: "123456",
        role: "admin",
    };
    await CreateUsersModel(user).finally(() => console.log("Successfully created User seed."));
}

main().finally(() => process.exit(0));

