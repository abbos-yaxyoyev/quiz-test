import { QuestionErrors } from "../../common/db/models/question/question.error";
import { QuestionModel } from "../../common/db/models/question/question.models";
import { create, findById, updateOne, countTotal, aggregate } from "../../common/service/base.service";

export async function createQuestionService(data: any) {
    try {
        return await create(QuestionModel, data);
    } catch (error) {
        console.log("error question creat :", error);
        throw QuestionErrors.UnknownError(error)
    }
}

export async function getQuizesTestService(limit: number = 20, quiz_id: any) {

    const pipline = [
        {
            '$sample': {
                size: 130 + limit
            }
        },
        {
            '$group': {
                "_id": "$_id",
                "question": {
                    "$first": "$$ROOT"
                }
            }
        },
        {
            '$limit': limit
        },
        {
            '$replaceRoot': {
                newRoot: '$question'
            }
        },
        {
            '$addFields': {
                'correct_answer_id': {
                    '$let': {
                        'vars': {
                            'answer': {
                                "$filter": {
                                    'input': '$alternativ',
                                    'cond': {
                                        '$eq': [
                                            '$$this.isCorrect', true
                                        ]
                                    }
                                }
                            }
                        },
                        "in": "$$answer._id"
                    }
                },
                'quiz_id': quiz_id,
                'question_id': "$_id"
            }
        },
        {
            '$project': {
                __v: 0,
                _id: 0,
                alternativ: 0,
                createdAt: 0,
                updateAt: 0
            }
        }
    ]

    const questions = await aggregate(QuestionModel, pipline);
    if (questions.length == 0) {
        throw QuestionErrors.NotFound(questions)
    }
    return questions;
}

export async function getQuestionByIdService(_id: string) {

    const question = await findById(QuestionModel, _id);
    console.log("question : 123");

    if (!question) {
        throw QuestionErrors.NotFound({ _id: _id })
    }
    return question;
}

export async function questionUpdateService(_id: string, data: any) {
    const question = await updateOne(QuestionModel, { _id }, data);
    if (!question) {
        throw QuestionErrors.NotFound(data)
    }
    return question;
}

export async function questionCaunttotalService() {
    const total = await countTotal(QuestionModel, {});
    if (!total) {
        throw QuestionErrors.NotFound(total)
    }
    return total;
}
