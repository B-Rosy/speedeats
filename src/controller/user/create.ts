import Bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { returnUser } from "../../utils/return_user";
import { UserRepository } from "../../repository/userRepository";
import {string, z} from "zod"; 


export async function create (request: FastifyRequest, reply: FastifyReply){

    const RequestBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        contact: z.string(),
        password: z.string().min(8)
    });

    const {name, email, password, contact} = RequestBodySchema.parse(request.body) as User;

    const userRepository = new UserRepository();
    
    try {
        console.log({name, email, password, contact});

        const salt = Bcrypt.genSaltSync(10);
            //Vai gerar uma chave aleatoria
        const hashedpassword = Bcrypt.hashSync(password, salt);

        const user = await userRepository.create({name, email, password: hashedpassword, contact})
    
    
        reply.send({
            message:"User created successfuly!",
            user: returnUser(user),
        });
            
    } catch (error) {
        // console.log(error);
    
        return reply.send(error);
            
    }


}