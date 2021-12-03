import { QuizDto, QuizDtoGroup } from "../../../common/validation/dto/quiz.dto";
import { validateIt } from "../../../common/validation/validator";
import { getQuizesTestService } from "../../services/question.service";
import { insertManyAnswerService, getAnswerByQuizIdService, getQuestionByQuizIdService } from "../../services/user_answer.service";
import { Status } from "../../../common/db/models/quiz/quiz.models";
import { QuizErrors } from "../../../common/db/models/quiz/quiz.error";
import { Types } from "mongoose";
import {
    createQuizService,
    getQuizByIdService,
    quizCaunttotalService,
    quizUpdateService
} from "../../services/quiz.service"

export async function createQuizController(request, reply) {
    const user = request.user;
    try {
        const data = await validateIt(request.body, QuizDto, [QuizDtoGroup.CREATE]);

        const obj = {
            user_id: user._id,
            total_count: data.total_count || 20,
            status: Status.DEFAULT
        }

        const quiz = await createQuizService(obj);
        const quizes_array = await getQuizesTestService(data.total_count, quiz._id);
        await insertManyAnswerService(quizes_array)
        console.log("insertCount :", "insert Many answer");

        return reply.success({ quiz_id: quiz._id });
    } catch (error) {
        throw QuizErrors.UnknownError(error)
    }
}

export async function getQuizByIdController(request, reply) {
    const data = await validateIt(request.params, QuizDto, [QuizDtoGroup.GETById])
    console.log(data);
    const question = await getQuizByIdService(data._id)
    return reply.success(question);
}

export async function quizRunningByIdController(request, reply) {
    const data = await validateIt(request.body, QuizDto, [QuizDtoGroup.GETById])
    console.log('userUpdateByIdController :', data);

    let obj = {
        started_at: new Date(),
        status: Status.RUNNING
    }

    const get_question = await getQuestionByQuizIdService(data._id)

    console.log("get_question: ");


    const quize = await quizUpdateService({ _id: data._id }, obj)
    return reply.success({ get_question });
}

export async function quizFinishedByIdController(request, reply) {
    const quiz = await validateIt(request.body, QuizDto, [QuizDtoGroup.GETById]);
    console.log('quizes :', quiz);
    const get_answer = await getAnswerByQuizIdService(quiz._id);

    let correct = 0;
    let sum = 0;
    get_answer.forEach((value, index, array) => {
        if (value.grade) {
            // sum += value.grade;
            correct++;
        }
    })

    let quize_obj = await getQuizByIdService(quiz._id);

    let obj = {
        finished_at: new Date(),
        status: Status.FINISHED,
        correct_count: correct,
        result: correct || sum,
        foizda: Math.round((correct * 100) / quize_obj.total_count),
        incorrect_count: quize_obj.total_count - correct
    }

    const data = await quizUpdateService({ _id: quiz._id }, obj)
    return reply.success({ data, get_answer });
}

export async function quizCaunttotalController(request, reply) {
    const userdata = await quizCaunttotalService()
    return reply.success(userdata);
}
