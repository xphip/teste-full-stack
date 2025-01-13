import {eq, sql} from "drizzle-orm";
import db from "../../db";
import {tokensSchema} from "../../db/schemas/user_tokens";

export async function AddToken(userID: number, token: string) {
    await db
        .insert(tokensSchema)
        .values({userId: userID, token: token})
        .returning();
}

export async function DeleteToken(userID: number, token: string) {
    await db
        .update(tokensSchema)
        .set({deleted_at: sql`NOW()`})
        .where(eq(tokensSchema.token, token))
        .execute();
}
