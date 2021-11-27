import { QuizDto, QuizDtoGroup } from "../../../common/validation/dto/quiz.dto";
import { validateIt } from "../../../common/validation/validator";
import { getQuizesTestService } from "../../services/question.service";
import { insertManyAnswerService, getAnswerByQuizeHistoryIdService } from "../../services/user_answer.service";
import { Status } from "../../../common/db/models/quiz/quiz.models";
import { Quize_HistoryErrors } from "../../../common/db/models/quiz/quiz.error";
import { Types } from "mongoose";
import {
    createQuizeHistoryService,
    getQuizeHistoryByIdService,
    quizeHistoryCaunttotalService,
    quizeHistoryUpdateService
} from "../../services/quiz.service"

export async function createQuestionHistoryController(request, reply) {
    const user = request.user;

    let obj = {
        user_id: user._id.toString(),
        started_at: new Date(),
        total_count: 20,
        status: Status.DEFAULT
    }
    try {
        const data = await validateIt(obj, QuizDto, [QuizDtoGroup.CREATE])
        const quize_history = await createQuizeHistoryService(data)
        let quizes_array = await getQuizesTestService(data.total_count, quize_history._id)

        let insertCount = await insertManyAnswerService(quizes_array)
        console.log("insertCount :", insertCount);

        return reply.success({ quize_history, insertCount });
    } catch (error) {
        throw Quize_HistoryErrors.UnknownError(error)
    }
}

export async function getQuizeHistoryByIdController(request, reply) {
    const data = await validateIt(request.params, QuizDto, [QuizDtoGroup.GETById])
    console.log(data);
    const question = await getQuizeHistoryByIdService(data._id)
    return reply.success(question);
}

export async function quizeHistoryRunningByIdController(request, reply) {
    const data = await validateIt(request.body, QuizDto, [QuizDtoGroup.GETById])
    console.log('userUpdateByIdController :', data);
    let quize_obj = await getQuizeHistoryByIdService(data._id);
    quize_obj.started_at = new Date()
    quize_obj.status = Status.RUNNING
    const quize = await quizeHistoryUpdateService({ _id: data._id }, quize_obj)
    return reply.success(quize);
}

export async function quizeHistoryFinishedByIdController(request, reply) {
    const quizes = await validateIt(request.body, QuizDto, [QuizDtoGroup.GETById]);
    console.log('quizes :', quizes);
    const get_answer = await getAnswerByQuizeHistoryIdService(quizes._id);
    console.log('get_answer :', get_answer);

    let correct = 0;
    let sum = 0;
    get_answer.forEach((value, index, array) => {
        if (value.isCorrect) {
            sum += value.isCorrect;
            correct++;
        }
    })

    let quize_obj = await getQuizeHistoryByIdService(quizes._id);
    quize_obj.finished_at = new Date();
    quize_obj.status = Status.FINISHED;
    quize_obj.correct_count = correct;
    quize_obj.result = sum;
    quize_obj.percent = `${Math.round((sum * 100) / quize_obj.total_count)}%`;
    quize_obj.incorrect_count = quize_obj.total_count - correct;

    const data = await quizeHistoryUpdateService({ _id: quizes._id }, quize_obj)
    return reply.success({ data, get_answer });
}

export async function quizeHistoryCaunttotalController(request, reply) {
    const userdata = await quizeHistoryCaunttotalService()
    return reply.success(userdata);
}
