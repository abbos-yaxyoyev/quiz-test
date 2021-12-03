import { QuestionDto, QuestionDtoGroup } from "../../../common/validation/dto/question.dto";
import { validateIt } from "../../../common/validation/validator";

import {
    createQuestionService,
    getQuestionByIdService,
    getQuizesTestService,
    questionCaunttotalService,
    questionUpdateService
} from "../../services/question.service";

export async function createQuestionController(request, reply) {
    const data = await validateIt(request.body, QuestionDto, [QuestionDtoGroup.CREATE])
    const question = await createQuestionService(data)
    return reply.success(question);
}

export async function getQuestionByIdController(request, reply) {
    const data = await validateIt(request.params, QuestionDto, [QuestionDtoGroup.GETById])
    console.log("data : 123");
    const question = await getQuestionByIdService(data._id)
    return reply.success(question);
}

export async function questionUpdateByIdController(request, reply) {
    const data = await validateIt(request.body, QuestionDto, [QuestionDtoGroup.UPDATE])
    console.log('userUpdateByIdController', data);
    await getQuestionByIdService(data._id)
    const question = await questionUpdateService(data._id, data)

    return reply.success(question);
}



export async function questionCaunttotalController(request, reply) {
    const userdata = await questionCaunttotalService()
    return reply.success(userdata);
}
