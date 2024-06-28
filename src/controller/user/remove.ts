import { Prisma, PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { request } from "http";
import { returnUser } from "../../utils/return_user";
import { UserRepository } from "../../repository/userRepository";
import { AppErrors } from "../../errors/appErrors";


const prismaClient = new PrismaClient();

export async function  remove (request: FastifyRequest, reply: FastifyReply) {

    const id = request.userId;

    const useRepo = new UserRepository();
    
        try {
            if (!id) throw new AppErrors("Error on authentication!");
           
            const user = await prismaClient.user.findUnique({where: {id}})
    
            if (!user) throw new AppErrors("Error on authentication!");
    
            const deletedUser = await useRepo.remove({  id});
            
            return reply.send({
                message : "User deleted successfully!",
                user: returnUser(deletedUser),
            });
    
        } catch (error) {
            console.log(error);
    
            reply.send(error);   
        }
};