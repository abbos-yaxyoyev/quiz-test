import { ErrorCodes, UserDefinedError } from "../../../custom.error";

export class UserErrors extends UserDefinedError {
    static NotFound(data: any) {
        return new UserDefinedError(ErrorCodes.USER, 'user not found', data)
    }
    static AllreadyExists(data: any) {
        return new UserDefinedError(ErrorCodes.USER + 1, 'user allready exist', data)
    }
    static InvalidPassword(data: any) {
        return new UserDefinedError(ErrorCodes.USER + 2, 'invalid passord', data)
    }
}