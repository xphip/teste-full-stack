import {UsersInsert, usersSchema} from "../schemas/users";
import db from "../index";
import {and, eq, isNull, sql} from "drizzle-orm";

export function ListUsers(offset: number = 0) {
    return db
        .select()
        .from(usersSchema)
        .offset(offset)
        .limit(10)
        .where(isNull(usersSchema.deleted_at))
        .execute();
}

export function GetUsers(id: string) {
    return db
        .select()
        .from(usersSchema)
        .where(and(
            eq(usersSchema.id, id),
            isNull(usersSchema.deleted_at),
        ))
        .execute();
}

export function GetUsersByEmail(email: string) {
    return db
        .select()
        .from(usersSchema)
        .where(and(
            eq(usersSchema.email, email),
            isNull(usersSchema.deleted_at),
        ))
        .execute();
}

export function CreateUsers(user: UsersInsert) {
    return db
        .insert(usersSchema)
        .values(user)
        .execute();
}

export function UpdateUsers(user: UsersInsert) {
    return db
        .update(usersSchema)
        .set(user)
        .where(and(
            eq(usersSchema.id, user.id),
            isNull(usersSchema.deleted_at)
        ))
        .execute();
}

export function DeleteUsers(id: string) {
    return db
        .update(usersSchema)
        .set({deleted_at: sql`NOW()`})
        .where(and(
            eq(usersSchema.id, id),
            isNull(usersSchema.deleted_at),
        ))
        .execute();
}
