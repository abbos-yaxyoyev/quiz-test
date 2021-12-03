import { QuizModel } from "../../common/db/models/quiz/quiz.models";
import { QuizErrors } from "../../common/db/models/quiz/quiz.error";
import { create, findById, updateOne, countTotal } from "../../common/service/base.service";

export async function createQuizService(data: any) {
    try {
        return await create(QuizModel, data);
    } catch (error) {
        throw QuizErrors.UnknownError(error)
    }
}

export async function getQuizByIdService(_id: string) {
    const question = await findById(QuizModel, _id);
    if (!question) {
        throw QuizErrors.NotFound({ _id: _id })
    }
    return question;
}

export async function quizUpdateService(query: object, data: any) {
    const question = await updateOne(QuizModel, query, data);
    if (!question) {
        throw QuizErrors.NotFound(data)
    }
    return question;
}

export async function quizCaunttotalService() {
    const total = await countTotal(QuizModel, {});
    if (!total) {
        throw QuizErrors.NotFound(total)
    }
    return total;
}
