import fp from "fastify-plugin";
import {
    userRegisterController,
    getUserByIdController,
    getUserByUsernameController,
    userCaunttotalController,
    userUpdateByQueryController
} from "../controllers/user/user.controller";


async function pl(instance, _, next) {

    instance.post(
        '/api/user/register',
        userRegisterController
    )

    instance.get(
        '/api/user/countTotal',
        {
            preValidation: [instance.authenticate]
        },
        userCaunttotalController
    )

    instance.get(
        '/api/user/:_id',
        {
            preValidation: [instance.authenticate]
        },
        getUserByIdController
    )

    instance.put(
        '/api/user/username',
        {
            preValidation: [instance.authenticate]
        },
        getUserByUsernameController
    )

    instance.put(
        '/api/user/updateuser',
        {
            preValidation: [instance.authenticate]
        },
        userUpdateByQueryController
    )

    next()
}

export const userPlugin = fp(pl)