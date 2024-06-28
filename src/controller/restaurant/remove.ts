import { PrismaClient, Restaurant } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { prismaClient } from "../../utils/prisma_client";
import { string, z } from "zod";
import { AppErrors } from "../../errors/appErrors";

const prisma_client = new PrismaClient();

export async function remove (request: FastifyRequest, reply: FastifyReply){
    const {id} = request.params as {id:string};
    
    const mySchema = z.object({
        id:z.string(),
    })

    mySchema.parse(id);

    const userId = request.userId

    if(!userId)throw new AppErrors("Error on authentication!") 

    const user = await prismaClient.user.findUnique({where: {id:userId}})

    if(!user)throw new AppErrors("User not found!") 

    const rest = await prismaClient.restaurant.findUnique({where:{id}})

    if(!rest)throw new AppErrors("Restaurant not found") 

    if(rest.userId!==request.userId) throw new AppErrors ("Can`t delete the restaurant!")

    const deletedRestaurant = await prismaClient.restaurant.delete({where:{id}});

    reply.send({message:"Ok", deletedRestaurant})
};