import { BeAnObject, ModelType } from "@typegoose/typegoose/lib/types"
import { Types } from "mongoose"
import { UserDefinedError } from "../custom.error"

export async function countTotal<T>(
    model: ModelType<T, BeAnObject>,
    query: object
) {
    try {
        return await model.countDocuments(query).exec()
    }
    catch (error) {
        throw UserDefinedError.UnknownError(error)
    }
}

export async function create<T>(
    model: ModelType<T, BeAnObject>,
    data: object
) {
    return await new model(data).save()
}

export async function insertMany<T>(
    model: ModelType<T, BeAnObject>,
    data: object[]
) {
    return await model.insertMany(data)
}

export async function aggregate<T>(
    model: ModelType<T, BeAnObject>,
    pipline: any[]
) {
    return await model.aggregate(pipline)
}

export async function updateOne<T>(
    model: ModelType<T, BeAnObject>,
    query: object,
    data: object
) {
    return await model.findOneAndUpdate(query, data, { useFindAndModify: true, new: true }).exec()
}

export async function updateMany<T>(
    model: ModelType<T, BeAnObject>,
    query: object,
    data: object
) {
    return await model.updateMany(query, data, { new: true }).exec()
}


export async function updateOneWithQuery<T>(
    model: ModelType<T, BeAnObject>,
    query,
    data: object
) {
    return await model.findOneAndUpdate(query, data, { new: true }).exec()
}

export async function findById<T>(
    model: ModelType<T, BeAnObject>,
    id: string
) {
    try {
        return await model.findById(id).exec()
    }
    catch (error) {
        throw UserDefinedError.UnknownError(error)
    }
}

export async function findAll<T>(
    model: ModelType<T, BeAnObject>,
    query: object
) {
    try {
        return await model.find(query).exec()
    }
    catch (error) {
        throw UserDefinedError.UnknownError(error)
    }
}

export async function findOne<T>(
    model: ModelType<T, BeAnObject>,
    query: object
) {
    try {
        return await model.findOne(query).exec()
    }
    catch (error) {
        throw UserDefinedError.UnknownError(error)
    }
}
