import { QuizModel } from "../../common/db/models/quiz/quiz.models";
import { Quize_HistoryErrors } from "../../common/db/models/quiz/quiz.error";
import { create, findById, updateOne, countTotal } from "../../common/service/base.service";

export async function createQuizeHistoryService(data: any) {
    try {
        const user = await create(QuizModel, data);
        return user;
    } catch (error) {
        throw Quize_HistoryErrors.UnknownError(error)
    }
}

export async function getQuizeHistoryByIdService(_id: string) {
    const question = await findById(QuizModel, _id);
    if (!question) {
        throw Quize_HistoryErrors.NotFound({ _id: _id })
    }
    return question;
}

export async function quizeHistoryUpdateService(query: object, data: any) {
    const question = await updateOne(QuizModel, query, data);
    if (!question) {
        throw Quize_HistoryErrors.NotFound(data)
    }
    return question;
}

export async function quizeHistoryCaunttotalService() {
    const total = await countTotal(QuizModel, {});
    if (!total) {
        throw Quize_HistoryErrors.NotFound(total)
    }
    return total;
}
