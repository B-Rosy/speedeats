import Bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { returnUser } from "../../utils/return_user";
import { UserRepository } from "../../repository/userRepository";


export async function create (request: FastifyRequest, reply: FastifyReply){

    const {name, email, password, contact} = request.body as User;

    const userRepository = new UserRepository();
    
    try {
        console.log({name, email, password, contact});
    
        if (!email) {
            throw new Error("Email can't be empty")
        }
        if (!password) {
            throw new Error("Password can't be empty")
        }
        if (!contact) {
            throw new Error("Contact can't be empty")
        }

        const salt = Bcrypt.genSaltSync(10);
            //Vai gerar uma chave aleatoria
        const hashedpassword = Bcrypt.hashSync(password, salt);

        const user = await userRepository.create({name, email, password, contact})
    
    
        reply.send({
            message:"User created successfuly!",
            user: returnUser(user),
        });
            
    } catch (error) {
        // console.log(error);
    
        return reply.send(error);
            
    }


}