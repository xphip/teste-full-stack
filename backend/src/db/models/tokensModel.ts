import db from "../index";
import {and, eq, isNull, sql} from "drizzle-orm";
import {TokensInsert, TokensSafeFields, tokensSchema} from "../schemas/tokens";
import {usersSchema} from "../schemas/users";

export function ListTokens(offset: number = 0) {
    return db
        .select(TokensSafeFields)
        .from(tokensSchema)
        .offset(offset)
        .limit(10)
        .where(isNull(tokensSchema.deleted_at))
        .execute();
}

export function GetToken(id: string) {
    return db
        .select(TokensSafeFields)
        .from(tokensSchema)
        .where(and(
            eq(tokensSchema.id, id),
            isNull(tokensSchema.deleted_at),
        ))
        .execute();
}

export function GetTokenWithUser(token: string) {
    return db
        .select()
        .from(tokensSchema)
        .leftJoin(usersSchema, eq(tokensSchema.userID, usersSchema.id))
        .where(and(
            eq(tokensSchema.token, token),
            isNull(tokensSchema.deleted_at),
        ))
        .execute();
}

export function CreateToken(token: TokensInsert) {
    return db
        .insert(tokensSchema)
        .values(token)
        .returning();
}

export function UpdateToken(token: TokensInsert) {
    return db
        .update(tokensSchema)
        .set(token)
        .where(and(
            eq(tokensSchema.id, token.id),
            isNull(tokensSchema.deleted_at)
        ))
        .execute();
}

export function DeleteTokens(token: string) {
    return db
        .update(tokensSchema)
        .set({
            deleted_at: sql`NOW()`
        })
        .where(and(
            eq(tokensSchema.token, token),
            isNull(tokensSchema.deleted_at),
        ))
        .returning();
}
