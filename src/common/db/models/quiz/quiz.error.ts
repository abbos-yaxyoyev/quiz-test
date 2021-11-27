import { ErrorCodes, UserDefinedError } from "../../../custom.error";

export class Quize_HistoryErrors extends UserDefinedError {
    static NotFound(data: any) {
        return new UserDefinedError(ErrorCodes.QUIZE_HISTORY, 'Question not found', data)
    }
}