import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { AppErrors } from "../errors/appErrors";

export function errorHandler(error:FastifyError, request:FastifyRequest, reply: FastifyReply){
    if (error instanceof ZodError){
        return reply.status(400).send({
            message:"Validation Error!",
            errors:error.flatten().fieldErrors
        })
    };

    if (error instanceof AppErrors){
        return reply.status(error.code).send({
            message: error.message
        })
    } 

    return reply.status(500).send({message: "internal server error"});

}