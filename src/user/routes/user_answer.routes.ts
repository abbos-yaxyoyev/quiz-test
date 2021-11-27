import fp from "fastify-plugin";
import {
    // createAnswersController,
    answerCaunttotalController,
    answerUpdateByQuizeHistoryIdController,
    getAnswerByQuizeHistoryIdController,
    getAnswerByIdController,
    // answerUpdateByIdController,
} from "../controllers/user_answer/user_answer.controller";


async function pl(instance, _, next) {

    instance.get(
        '/api/answer/countTotal',
        answerCaunttotalController
    )

    instance.get(
        '/api/answer/:_id',
        getAnswerByIdController
    )

    instance.put(
        '/api/answer/quize_answer',
        getAnswerByQuizeHistoryIdController
    )

    instance.put(
        '/api/answer/updateAnswer',
        answerUpdateByQuizeHistoryIdController
    )

    next()
}

export const answerPlugin = fp(pl)