
import { FastifyInstance } from "fastify";
import * as controller from "../controller/user";
import { authMiddleware } from "../middleware/auth";
import { uploadMiddleware } from "../middleware/upload";


export async function userRoutes(fastify: FastifyInstance){

    fastify.post('/', controller.create );

    fastify.post('/auth', controller.auth);
    
    fastify.put('/',  {preHandler: authMiddleware}, controller.update );
    
    fastify.delete('/',  {preHandler: authMiddleware}, controller.remove );

    fastify.patch('/avatar', {preHandler: uploadMiddleware}, controller.uploadAvatar);
}