import Bcrypt from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";
import { returnUser } from "../../utils/return_user";
import jwt from "jsonwebtoken"
import { secret } from "../../constants/security_passwords";
import { UserRepository } from "../../repository/userRepository";
import { User } from "@prisma/client";

const userRepo = new UserRepository();

export async function auth (request: FastifyRequest, reply: FastifyReply){

    const {email, password} = request.body as User;

    try {
        
        if (!email) throw new Error("Email can't be empty")
        if (!password) throw new Error("Password can't be empty")

        const user = await userRepo.find(
            { email }
        );

        if (!user) throw new Error("This user doesn't exit!");

        const match = await Bcrypt.compare(password, user.password); 
        //compara a senha enviada pelo user um a senha criptografada

        if (!match) throw new Error("Email or password is incorrect!");

        const token = jwt.sign({id: user.id, name: user.name}, secret, {expiresIn: "7d"})

        return reply.send({
            message : "Ok!",
            data: {user: returnUser(user), token}
        });
        
        
    } catch (error) {
        console.log(error);

        reply.send(error);
    }



}