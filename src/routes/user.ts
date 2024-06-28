
import { FastifyInstance } from "fastify";
import * as controller from "../controller/user";
import { authMiddleware } from "../middleware/auth";
import { uploadMiddleware } from "../middleware/upload";


export async function userRoutes(fastify: FastifyInstance){
    fastify.post('/', controller.create );
    fastify.post('/auth', controller.auth);

    fastify.addHook("preHandler", authMiddleware)

    fastify.put('/', controller.update );
    fastify.delete('/', controller.remove );
    fastify.patch('/avatar', {preHandler: uploadMiddleware("avatar")}, controller.uploadAvatar);
}