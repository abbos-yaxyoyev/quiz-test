import { Types } from "mongoose";
import { AnswerErrors } from "../../common/db/models/user_answer/user_answer.error";
import { AnswerQuestionModel } from "../../common/db/models/user_answer/user_answer.models";
import { findOne, findAll, create, findById, updateOne, countTotal, insertMany, aggregate } from "../../common/service/base.service";

export async function createAnswerService(data: object[]) {
    try {
        const questions = await create(AnswerQuestionModel, data);
        return questions;
    } catch (error) {
        throw AnswerErrors.UnknownError(error)
    }
}

export async function insertManyAnswerService(data: object[]) {
    try {
        const questions = await insertMany(AnswerQuestionModel, data);
        return questions;
    } catch (error) {
        throw AnswerErrors.UnknownError(error)
    }
}

export async function getAnswerByIdService(_id: string) {
    const question = await findById(AnswerQuestionModel, _id);
    if (!question) {
        throw AnswerErrors.NotFound({ _id: _id })
    }
    return question;
}

export async function getAnswerByQuizeIdService(query: object) {
    const question = await findOne(AnswerQuestionModel, query);
    if (!question) {
        throw AnswerErrors.NotFound({ question })
    }
    return question;
}

export async function getAnswerByQuizeHistoryIdService(quiz_id: string) {

    const pipline = [
        {
            $match: {
                quiz_id: Types.ObjectId(quiz_id)
            }
        },
        {
            $addFields: {
                isCorrect: {
                    $cond: [
                        {
                            $eq: [
                                {
                                    $size: "$correct_answer_id"
                                },
                                1
                            ]
                        },
                        {
                            $size: {
                                $setIntersection: ["$correct_answer_id", "$user_answer_id"]
                            }
                        },
                        {
                            $trunc: [
                                {
                                    $divide: [
                                        { $size: { $setIntersection: ["$correct_answer_id", "$user_answer_id"] } },
                                        { $size: "$correct_answer_id" }
                                    ]
                                },
                                2
                            ]
                        }
                    ]
                }
            }
        },
        {
            '$project': {
                __v: 0,
                // _id: 0,
                // alternativ: 0,
                // createdAt: 0,
                // updateAt: 0
            }
        }
    ]

    const question = await aggregate(AnswerQuestionModel, pipline);
    if (!question) {
        throw AnswerErrors.NotFound({ quiz_id })
    }
    return question;
}

export async function answerUpdateByIdeService(query: object, data: any) {
    const question = await updateOne(AnswerQuestionModel, query, data);
    if (!question) {
        throw AnswerErrors.NotFound(data)
    }
    return question;
}

export async function answerCaunttotalService() {
    const total = await countTotal(AnswerQuestionModel, {});
    if (!total) {
        throw AnswerErrors.NotFound(total)
    }
    return total;
}
