import { Types } from "mongoose";
import { AnswerErrors } from "../../common/db/models/user_answer/user_answer.error";
import { AnswerModel } from "../../common/db/models/user_answer/user_answer.models";
import { findOne, findAll, create, findById, updateOne, countTotal, insertMany, aggregate } from "../../common/service/base.service";

export async function createAnswerService(data: object[]) {
    try {
        const questions = await create(AnswerModel, data);
        return questions;
    } catch (error) {
        throw AnswerErrors.UnknownError(error)
    }
}

export async function insertManyAnswerService(data: object[]) {
    try {
        return await insertMany(AnswerModel, data);
    } catch (error) {
        throw AnswerErrors.UnknownError(error)
    }
}

export async function getAnswerByIdService(_id: string) {
    const question = await findById(AnswerModel, _id);
    if (!question) {
        throw AnswerErrors.NotFound({ _id: _id })
    }
    return question;
}

export async function getAnswerByQuizeIdService(query: object) {
    const question = await findOne(AnswerModel, query);
    if (!question) {
        throw AnswerErrors.NotFound({ question })
    }
    return question;
}

export async function getAnswerByQuizIdService(quiz_id: string) {

    const pipline = [
        {
            $match: {
                quiz_id: Types.ObjectId(quiz_id)
            }
        },
        {
            $addFields: {
                grade: {
                    $cond: [
                        {
                            $eq: [
                                {
                                    $size: "$user_answer_id"
                                },
                                0
                            ]
                        },
                        0,
                        {
                            $cond: [
                                {
                                    $eq: [
                                        // { $size: "$user_answer_id" }, talabga qarab almashtiramiz
                                        { $size: "$correct_answer_id" },
                                        { $size: { $setIntersection: ["$correct_answer_id", "$user_answer_id"] } }
                                    ]
                                },
                                1,
                                0
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

    const question = await aggregate(AnswerModel, pipline);
    if (question.length == 0) {
        throw AnswerErrors.NotFound({ quiz_id })
    }
    return question;
}

export async function getQuestionByQuizIdService(quiz_id: string) {

    const pipline = [
        {
            $match: {
                quiz_id: Types.ObjectId(quiz_id)
            }
        },
        {
            $lookup: {
                from: 'questions',
                localField: 'question_id',
                foreignField: '_id',
                as: 'questions'
            }
        },
        {
            $unwind: {
                path: '$questions'
            }
        },
        {
            $replaceRoot: {
                newRoot: '$questions'
            }
        },
        {
            $project: {
                'alternativ.isCorrect': 0
            }
        }
    ]

    const question = await aggregate(AnswerModel, pipline);
    if (question.length == 0) {
        throw AnswerErrors.NotFound({ quiz_id })
    }
    return question;
}

export async function answerUpdateByIdeService(query: object, data: any) {
    const question = await updateOne(AnswerModel, query, data);
    if (!question) {
        throw AnswerErrors.NotFound(data)
    }
    return question;
}

export async function answerCaunttotalService() {
    const total = await countTotal(AnswerModel, {});
    if (!total) {
        throw AnswerErrors.NotFound(total)
    }
    return total;
}
