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
    getAnswerByQuizeHistoryIdService
} from "../../services/user_answer.service";

export async function getAnswerByIdController(request, reply) {
    const data = await validateIt(request.params, AnswerDto, [AnswerDtoGroup.GETById])
    console.log("data :", data);
    const question = await getAnswerByIdService(data._id)
    return reply.success(question);
}

export async function getAnswerByQuizeHistoryIdController(request, reply) {
    const data = await validateIt(request.body, AnswerDto, [AnswerDtoGroup.QUIZ_ID])
    console.log("quiz_id :", data);
    const question = await getAnswerByQuizeHistoryIdService(data.quiz_id)
    return reply.success(question);
}

export async function answerUpdateByQuizeHistoryIdController(request, reply) {
    const data = await validateIt(request.body, AnswerDto, [AnswerDtoGroup.USER_ANSWER_ID])
    console.log("data :", data);
    // const get_answer: any = await getAnswerByQuizeIdService({ _id: Types.ObjectId(data._id), quize_id: Types.ObjectId(data.quiz_id) });
    // get_answer.user_answer_id = data.user_answer_id

    const set_answer = await answerUpdateByIdeService({ _id: Types.ObjectId(data._id), quiz_id: Types.ObjectId(data.quiz_id) }, { user_answer_id: data.user_answer_id });
    return reply.success(set_answer);
}

export async function answerCaunttotalController(request, reply) {
    const userdata = await answerCaunttotalService()
    return reply.success(userdata);
}
