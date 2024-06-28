import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken"
import { secret } from "../constants/security_passwords";
import { AppErrors } from "../errors/appErrors";

export function authMiddleware (
    request: FastifyRequest, 
    reply: FastifyReply, 
    done: (errors?: FastifyError) => void){

        const auth = request.headers.authorization

        if(!auth) throw new AppErrors("Token not found!");
        
        const [__, token] =  auth.split(" ")

        if(!token) throw new AppErrors("Token not found!");

        const {id} = jwt.verify(token, secret) as {id: string}

        request.userId = id;

        done();
    

}
 