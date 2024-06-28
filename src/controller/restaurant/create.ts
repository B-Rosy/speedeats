import {string, z} from "zod";
import { PrismaClient, Restaurant } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { AppErrors } from "../../errors/appErrors";

export async function create (request:FastifyRequest, reply:FastifyReply){
    const{name, email, description, hallal, contact,  latitude, longitude,} = request.body as Restaurant

    const userId = request.userId;

    const mySchema = z.object({
        name:z.string(),
        email:z.string().email(),
        description:z.string().nullable(),
        hallal:z.boolean(),
        contact:z.string(),
        latitude:string(),
        longitude:string()
    })

    mySchema.parse(request.body);

    if(!userId)throw new AppErrors("Authentication error!", 401);

    const prismaClient = new PrismaClient();

    const restaurant = await prismaClient.restaurant.create({
        data:{
            name,
            email,
            description,
            hallal,
            contact,
            latitude,
            longitude,
            user:{connect:{id: userId}}
        }
    });

    reply.send({message:"OK", restaurant})

};