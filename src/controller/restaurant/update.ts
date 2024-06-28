import {string, z} from "zod";
import { PrismaClient, Restaurant } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { AppErrors } from "../../errors/appErrors";

export const update = async (request:FastifyRequest, reply:FastifyReply) => {
    const {id,name, email, description, hallal, contact, latitude, longitude} = request.body as Restaurant;

    const mySchema = z.object({
        name:z.string(),
        email:z.string().email(""),
        description:z.string().nullable(),
        hallal:z.boolean(),
        contact:z.string(),
        latitude:string(),
        longitude:string()
    })

    if(!id) throw new Error("Id can't be null!");

    if(email) mySchema.parse({email});
    if(description) mySchema.parse({description});
    if(hallal) mySchema.parse({hallal});
    if(contact) mySchema.parse({contact});
    if(latitude) mySchema.parse({latitude});
    if(longitude) mySchema.parse({longitude});



    const prismaClient = new PrismaClient();

    const rest = await prismaClient.restaurant.findUnique ({where:{id}});
    if(!rest) throw new AppErrors("Restaurant not found", 401); 

    const updatedRestaurant = await prismaClient.restaurant.update({
        where:{id},
        data:{
            name,
            email,
            description,
            hallal,
            contact,
            latitude,
            longitude,
        }
    });

    reply.send({message:"Ok", updatedRestaurant})

} 