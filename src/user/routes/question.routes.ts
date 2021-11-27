import fp from "fastify-plugin";
import {
    createQuestionController,
    questionCaunttotalController,
    getQuestionByIdController,
    questionUpdateByIdController
} from "../controllers/question/question.controller";


async function pl(instance, _, next) {

    instance.post(
        '/api/question/create',
        {
            preValidation: [instance.authenticate]
        },
        createQuestionController
    )

    instance.get(
        '/api/question/countTotal',
        {
            preValidation: [instance.authenticate]
        },
        questionCaunttotalController
    )

    instance.get(
        '/api/question/:_id',
        {
            preValidation: [instance.authenticate]
        },
        getQuestionByIdController
    )

    instance.put(
        '/api/question/updateById',
        {
            preValidation: [instance.authenticate]
        },
        questionUpdateByIdController
    )

    next()
}

export const questionPlugin = fp(pl)