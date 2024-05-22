import Bcrypt from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";
import { returnUser } from "../../utils/return_user";
import { IUpdateUser } from "../../@types/app";
import { UserRepository } from "../../repository/userRepository";
import { prismaClient } from "../../utils/prisma_client";


export async function update (request: FastifyRequest, reply: FastifyReply) {

    const { name, email, newPassword, password, contact} = request.body as IUpdateUser;

    const id = request.userId;

    const userRepo = new UserRepository()
    
        try {
            
            if(!request.headers.authorization) throw new Error("Token not found");
    
            const user = await userRepo.find({id});
    
            const splited = request.headers.authorization.split(" ");
            console.log(splited)
    
            if (!id) throw new Error("Error on authentication!");
    
            if (!user) throw new Error("Error on authentication!");
    
            if(newPassword || email){
                if(!password) throw new Error("Please, send the old password!");
               
                const match = await Bcrypt.compareSync(password, user.password)
    
                if (!match) throw new Error("Old password is incorrect!");
                
            }
    
            if (newPassword){
                const salt = Bcrypt.genSaltSync();
                const hash = Bcrypt.hashSync(newPassword, salt);
                await userRepo.update({ id, password: hash });
    
            }
    
            const updatedUser = await userRepo.update({
                id, 
                name,
                email, 
                contact,
            });
    
            return reply.send({
                message : "User updated successfully!",
                data: {user: returnUser(user)},
            });
    
            } catch (error) {
              //console.log(erro);
    
                reply.send(error);
            }
}