import fp from "fastify-plugin";
import {
    // createAnswersController,
    answerCaunttotalController,
    answerUpdateByQuizIdController,
    getAnswerByQuizIdController,
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
        getAnswerByQuizIdController
    )

    instance.put(
        '/api/answer/updateAnswer',
        answerUpdateByQuizIdController
    )

    next()
}

export const answerPlugin = fp(pl)