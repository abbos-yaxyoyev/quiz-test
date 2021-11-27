import fastifyJWT from "fastify-jwt";
import fp from "fastify-plugin";
import { getUserByUsernameService } from "../../user/services/user.service";
import { UserDefinedError } from "../custom.error";

async function authenticate(request, reply) {
    try {
        const { username } = await request.jwtVerify();
        const user = await getUserByUsernameService(username);
        request.user = user;
    } catch (error) {
        return reply.status(401).send({
            statusCode: 401,
            code: 401,
            message: 'Unauthorized'
        })
    }
}

async function pl(instance, options, next) {

    instance.register(fastifyJWT, {
        secret: process.env.JWT_SECRET || 'JWT_SECRET',
        sign: {
            expiresIn: process.env.JWT_EXPIRES || '1w'
        }
    });

    instance.decorate(
        'authenticate',
        authenticate
    )

    // instance.decorate(
    //     'authenticate_admin',
    //     authenticate_admin
    // )

    instance.addHook(
        'onRequest',
        (request, reply, next) => {
            request.instance = instance;
            next()
        }
    )

    next()
}

export const authPlugin = fp(pl)

export function jwtSign(request, params) {
    return request.instance.jwt.sign(params);
}
