import {string, z} from "zod";
import { PaymentLog, PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { AppErrors } from "../../errors/appErrors";

export async function create(request:FastifyRequest, reply:FastifyReply){
    const{phoneNumber,amount, revertState, cartId}= request.body as PaymentLog;

    const userId = request.userId;

    const mySchema = z.object({
        phoneNumber:z.string(),
        amount:z.number(),
        revertState:z.boolean(),
        
    })

    mySchema.parse(request.body);

    const prismaClient = new PrismaClient();

    if(!userId)throw new AppErrors("Authentication error!", 401);

    const paymentLog = await prismaClient.paymentLog.create({
        data:{
            phoneNumber,
            amount,
            revertState,
            cart:{connect:{id:cartId}},
            user:{connect:{id: userId}}
        }
    });

    reply.send({message:"OK", paymentLog});

};