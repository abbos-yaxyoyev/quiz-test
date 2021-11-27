import { ErrorCodes, UserDefinedError } from "../../../custom.error";

export class QuestionErrors extends UserDefinedError {
    static NotFound(data: any) {
        return new UserDefinedError(ErrorCodes.QUESTION, 'Question not found', data)
    }
}