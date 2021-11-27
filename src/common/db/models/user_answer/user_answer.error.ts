import { ErrorCodes, UserDefinedError } from "../../../custom.error";

export class AnswerErrors extends UserDefinedError {
    static NotFound(data: any) {
        return new UserDefinedError(ErrorCodes.ANSWER, 'Question not found', data)
    }
}