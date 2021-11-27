import fp from "fastify-plugin";

export enum ErrorCodes {
    SUCCESS = 0,
    DEFAULT = 1000,
    USER = 1100,
    QUESTION = 1200,
    ANSWER = 1300,
    QUIZE_HISTORY = 1400
}

export class UserDefinedError {
    constructor(public code: number, public message: string, public data?: any) { };

    static UnknownError(data: any = null) {
        return new UserDefinedError(ErrorCodes.DEFAULT, 'Unknown error', data); // return {code: 1000, message: 'Unknown error',data}
    }

    static ValidationError(message: string, data: any = null) {
        return new UserDefinedError(ErrorCodes.DEFAULT + 1, message, data);
    }

    static InvalidUploadType(data: any = null) {
        return new UserDefinedError(ErrorCodes.DEFAULT + 2, 'Invalid upload type', data);
    }

    static NotEnoughPermission(data: any = null) {
        return new UserDefinedError(ErrorCodes.DEFAULT + 3, "You dont have permission to perform this operation", data);
    }

    static TooManyAttempts(data: any = null) {
        return new UserDefinedError(ErrorCodes.DEFAULT + 4, "you have made too many attempts ", data);
    }

    static OtpExpired(data: any = null) {
        return new UserDefinedError(ErrorCodes.DEFAULT + 5, "expired code ", data);
    }

    static Blocked() {
        return new UserDefinedError(ErrorCodes.DEFAULT + 6, "block 2 minutes ");
    }

    static SmsCodeDontMatch() {
        return new UserDefinedError(ErrorCodes.DEFAULT + 7, "invalid sms code");
    }

    static Success(data: any = "OK") {
        return new UserDefinedError(ErrorCodes.SUCCESS, 'Success', data);
    }
}

async function pl(instance, options, next) {

    instance.decorateReply('success', function (data) {
        const result = UserDefinedError.Success(data);
        return this.send(result)
    })

    instance.decorateReply('fail', function (data: UserDefinedError) {
        return this.status(400).send(data)
    })

    // global
    instance.setErrorHandler((error, _request, reply) => {
        if (error instanceof UserDefinedError) {
            return reply.fail(error)
        }
        reply.send(error)
    })

    next()
}

export const customErrorPlugin = fp(pl);