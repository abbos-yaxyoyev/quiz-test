import fp from "fastify-plugin";
import {
    createQuestionHistoryController,
    getQuizeHistoryByIdController,
    quizeHistoryCaunttotalController,
    quizeHistoryFinishedByIdController,
    quizeHistoryRunningByIdController
} from "../controllers/quiz/quiz.controller"


async function pl(instance, _, next) {

    instance.post(
        '/api/quize/create',
        {
            preValidation: [instance.authenticate]
        },
        createQuestionHistoryController
    )

    instance.get(
        '/api/quize/countTotal',
        {
            preValidation: [instance.authenticate]
        },
        quizeHistoryCaunttotalController
    )

    instance.get(
        '/api/quize/:_id',
        {
            preValidation: [instance.authenticate]
        },
        getQuizeHistoryByIdController
    )

    instance.put(
        '/api/quize/updateFinished',
        {
            preValidation: [instance.authenticate]
        },
        quizeHistoryFinishedByIdController
    )

    instance.put(
        '/api/quize/updateRunning',
        {
            preValidation: [instance.authenticate]
        },
        quizeHistoryRunningByIdController
    )

    next()
}

export const quizPlugin = fp(pl)