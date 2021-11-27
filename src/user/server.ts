
import DotEnv from 'dotenv';
DotEnv.config({
    path: '../../.env'
})

import fastify from 'fastify'
import path from 'path'
import { customErrorPlugin } from '../common/custom.error';
import { connectDbPlugin } from '../common/db/connect.db';
import { authPlugin } from '../common/middleware/authorization';

import { userPlugin } from './routes/user.routes';
import { answerPlugin } from './routes/user_answer.routes';
import { questionPlugin } from './routes/question.routes';
import { quizPlugin } from './routes/quiz.routes';


import FastifyCors from 'fastify-cors'
import fastifyStatic from 'fastify-static';


const server = fastify({ logger: true })

server.register(FastifyCors, { origin: true });

//! static files
server.register(fastifyStatic, {
    root: path.join(__dirname, '../../', 'public/front/'),
    prefix: '/public/front/'
});


server.register(customErrorPlugin);
server.register(connectDbPlugin);
server.register(authPlugin);
//! routes 
server.register(userPlugin);
server.register(answerPlugin);
server.register(questionPlugin);
server.register(quizPlugin);


async function start() {
    try {
        const options = {
            port: parseInt(process.env.ADMIN_PORT) || 5000,
            host: process.env.HOST || '0.0.0.0'
        }
        await server.listen(options);
        console.log('Started user!')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start();