import { FastifyReply, FastifyRequest } from "fastify";

export function uploadAvatar (request: FastifyRequest, reply: FastifyReply){
    reply.send({
        message:"!",
    });
}
