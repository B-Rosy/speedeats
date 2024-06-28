import Bcrypt from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";
import { returnUser } from "../../utils/return_user";
import { IUpdateUser } from "../../@types/app";
import { UserRepository } from "../../repository/userRepository";
import { prismaClient } from "../../utils/prisma_client";
import { string, z } from "zod";
import { AppErrors } from "../../errors/appErrors";


export async function update (request: FastifyRequest, reply: FastifyReply) {
    const id = request.userId;

    const BodySchema = z.object({ 
        name: z.string().optional(),
        email: z.string().optional(), 
        contact: z.string().optional(),
        newPassword: z.string().optional(),
        password: z.string().optional()
    });

    const { name, email, newPassword, password, contact} = BodySchema.parse(request.body);


    const userRepo = new UserRepository()
    
        try {
            if (!id) throw new AppErrors("Error on authentication!");
            
            const user = await userRepo.find({id});
       
            if (!user) throw new AppErrors("Error on authentication!");
    
            if(newPassword || email){
                if(!password) throw new AppErrors("Please, send the old password!");
               
                const match = Bcrypt.compareSync(password, user.password)
    
                if (!match) throw new AppErrors("Old password is incorrect!");
                
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