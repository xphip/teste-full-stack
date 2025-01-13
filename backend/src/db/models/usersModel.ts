import { UsersInsert, usersSchema, UsersSelect } from "../schemas/users";
import db from "../index";
import { eq, sql } from "drizzle-orm";

type UsersModel = UsersSelect;

export async function ListUsersModel(): Promise<UsersModel[]> {
    return await db
        .select()
        .from(usersSchema)
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
