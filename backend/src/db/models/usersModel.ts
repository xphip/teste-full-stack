import { UsersInsert, usersSchema, UsersSelect } from "../schemas/users";
import db from "../index";
import {eq, getTableColumns, sql} from "drizzle-orm";

type UsersModel = UsersSelect;

const {_id, password, deleted_at, ...fields} = getTableColumns(usersSchema);

export async function ListUsersModel(offset: number = 0) {
    return await db
        .select(fields)
        .from(usersSchema)
        .offset(offset)
        .limit(10)
        .execute();
}

export async function GetUsersModel(id: string): Promise<UsersModel[]> {
    return await db
        .select()
        .from(usersSchema)
        .where(eq(usersSchema.id, id))
        .execute();
}

export async function CreateUsersModel(user: UsersInsert) {
    return await db
        .insert(usersSchema)
        .values(user)
        .execute();
}

export async function UpdateUsersModel(user: UsersInsert) {
    return await db
        .update(usersSchema)
        .set(user)
        .where(eq(usersSchema.id, user.id))
        .execute();
}

export async function DeleteUsersModel(id: string) {
    return await db
        .update(usersSchema)
        .set({deleted_at: sql`NOW()`})
        .where(eq(usersSchema.id, id))
        .execute();
}
