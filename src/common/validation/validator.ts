import {ClassConstructor, plainToClass} from 'class-transformer';
import {validate, ValidationError} from 'class-validator';
import {UserDefinedError} from '../custom.error';

export const firstError = (errors: ValidationError[]) => {

    for (const error of errors) {

        if (error.contexts) {
            const data = error.property;
            const message = Object.values(error.contexts).shift();
            return {
                data,
                message
            }
        }

        if (error.constraints) {
            const data = error.property;
            const message = Object.values(error.constraints).shift();
            return {
                data,
                message
            }
        }

        if (error.children.length) {
            return firstError(error.children);
        }
    }

    return null;
};

export const validateIt = async <T>(data: any, classType: ClassConstructor<T>, groups?) => {

    if (!data) {
        throw UserDefinedError.ValidationError('Request body should be object')
    }
    const classData = plainToClass(classType, data as T, {excludeExtraneousValues: false, });
    const errors = await validate(classData as any, {groups, whitelist: true});

    if (!errors || errors.length === 0) {
        return classData;
    }
    const error = firstError(errors)
    throw UserDefinedError.ValidationError(error.message, error.data);
};
