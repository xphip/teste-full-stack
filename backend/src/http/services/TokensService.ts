import {TokensInsert} from "../../db/schemas/tokens";
import {CreateToken, DeleteTokens, GetTokenWithUser} from "../../db/models/tokensModel";
import {v4 as uuid} from "uuid";
import {JwtSign} from "./AuthService";
import jwtService from "jsonwebtoken";
import {SessionType} from "../types";
import {ParseToken} from "../utils";

export async function AddToken(token: TokensInsert) {
    return CreateToken(token);
}

export async function DeleteToken(token: string) {
    return DeleteTokens(token);
}

export async function RefreshToken(token: string) {
    const parsedToken = ParseToken(token);

    const decodedToken = jwtService.decode(parsedToken) as SessionType;
    if (!decodedToken)
        return null;

    const currentTokens = await GetTokenWithUser(parsedToken);
    if (!currentTokens || currentTokens?.length === 0)
        return null;

    const currentToken = currentTokens[0];
    if (currentTokens?.length === 0 || !currentToken?.users)
        return null;

    const newUUID: string = uuid();

    const payload = {
        id: newUUID,
        username: currentToken.users.username,
        email: currentToken.users.email,
        role: currentToken.users.role,
    };

    const newEncodedToken = JwtSign(payload);
    if (token === "") {
        return null;
    }

    const newToken: TokensInsert = {
        userID: currentToken.users.id,
        id: newUUID,
        token: newEncodedToken,
    }

    const deleteResult = await DeleteTokens(parsedToken);
    console.log(deleteResult)
    return AddToken(newToken);
}
