import {RequestCustom} from "../types";
import {IsOwnership} from "../requestValidators";

export function ValidateOwnership(req: RequestCustom) {
    return IsOwnership(req);
}
