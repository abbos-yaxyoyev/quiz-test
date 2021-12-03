import fp from "fastify-plugin";
import {
    createQuizController,
    getQuizByIdController,
    quizCaunttotalController,
    quizFinishedByIdController,
    quizRunningByIdController
} from "../controllers/quiz/quiz.controller"


async function pl(instance, _, next) {

    instance.post(
        '/api/quize/create',
        {
            preValidation: [instance.authenticate]
        },
        createQuizController
    )

    instance.get(
        '/api/quize/countTotal',
        {
            preValidation: [instance.authenticate]
        },
        quizCaunttotalController
    )

    instance.get(
        '/api/quize/:_id',
        {
            preValidation: [instance.authenticate]
        },
        getQuizByIdController
    )

    instance.put(
        '/api/quize/updateFinished',
        {
            preValidation: [instance.authenticate]
        },
        quizFinishedByIdController
    )

    instance.put(
        '/api/quize/updateRunning',
        {
            preValidation: [instance.authenticate]
        },
        quizRunningByIdController
    )

    next()
}

export const quizPlugin = fp(pl)