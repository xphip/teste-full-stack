import {UsersInsert, usersSchema, UsersSelect} from "../schemas/users";
import db from "../index";
import {and, eq, getTableColumns, isNull, sql} from "drizzle-orm";

type UsersModel = UsersSelect;

const {_id, password, deleted_at, ...fields} = getTableColumns(usersSchema);

export async function ListUsersModel(offset: number = 0) {
    return await db
        .select(fields)
        .from(usersSchema)
        .offset(offset)
        .limit(10)
        .where(isNull(usersSchema.deleted_at))
        .execute();
}

export async function GetUsersModel(id: string): Promise<UsersModel[]> {
    return await db
        .select()
        .from(usersSchema)
        .where(and(
            eq(usersSchema.id, id),
            isNull(usersSchema.deleted_at),
        ))
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
        .where(and(
            eq(usersSchema.id, user.id),
            isNull(usersSchema.deleted_at)
        ))
        .execute();
}

export async function DeleteUsersModel(id: string) {
    return await db
        .update(usersSchema)
        .set({
            deleted_at: sql`NOW()`
        })
        .where(and(
            eq(usersSchema.id, id),
            isNull(usersSchema.deleted_at),
        ))
        .execute();
}
