import {CreateUsers} from "../models/usersModel";
import {UsersInsert} from "../schemas/users";
import {v4 as uuid} from "uuid";

async function main() {
    const users: UsersInsert[] = [{
        id: uuid(),
        username: "admin",
        email: "admin@localhost",
        password: "$2b$10$QkfQUTcBX8/kWYFXIJs1DuiZywSBJrRxImJZg46nKHPrO1DyjNTOu", // 123456
        role: "admin",
    }, {
        id: uuid(),
        username: "test",
        email: "test@localhost",
        password: "$2b$10$QkfQUTcBX8/kWYFXIJs1DuiZywSBJrRxImJZg46nKHPrO1DyjNTOu", // 123456
        role: "user",
    }, {
        id: uuid(),
        username: "guest",
        email: "guest@localhost",
        password: "$2b$10$QkfQUTcBX8/kWYFXIJs1DuiZywSBJrRxImJZg46nKHPrO1DyjNTOu", // 123456
        role: "user",
    }];

    await Promise.all(
        users.map(async (user: UsersInsert) => {
            await CreateUsers(user)
            console.log(`Successfully created User id '${user.id}' seed.`);
        })
    );
}

main().catch(err => console.warn(err)).finally(() => process.exit(0));

