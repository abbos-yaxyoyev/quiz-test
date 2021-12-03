import { AnswerDtoGroup, AnswerDto } from "../../../common/validation/dto/user_answer.dto";
import { validateIt } from "../../../common/validation/validator";
import { getQuizesTestService } from "../../services/question.service";
import { Types } from "mongoose";
import {
    insertManyAnswerService,
    getAnswerByIdService,
    answerCaunttotalService,
    answerUpdateByIdeService,
    getAnswerByQuizeIdService,
    getAnswerByQuizIdService
} from "../../services/user_answer.service";

export async function getAnswerByIdController(request, reply) {
    const data = await validateIt(request.params, AnswerDto, [AnswerDtoGroup.GETById])
    console.log("data :", data);
    const question = await getAnswerByIdService(data._id)
    return reply.success(question);
}

export async function getAnswerByQuizIdController(request, reply) {
    const data = await validateIt(request.body, AnswerDto, [AnswerDtoGroup.QUIZ_ID])
    console.log("quiz_id :", data);
    const question = await getAnswerByQuizIdService(data.quiz_id)
    return reply.success(question);
}

export async function answerUpdateByQuizIdController(request, reply) {
    const data = await validateIt(request.body, AnswerDto, [AnswerDtoGroup.USER_ANSWER_ID])
    console.log("data :", data);
    const set_answer = await answerUpdateByIdeService({ question_id: Types.ObjectId(data.question_id), quiz_id: Types.ObjectId(data.quiz_id) }, { user_answer_id: data.user_answer_id });
    return reply.success({ chooose_answer: set_answer.user_answer_id });
}

export async function answerCaunttotalController(request, reply) {
    const userdata = await answerCaunttotalService()
    return reply.success(userdata);
}
