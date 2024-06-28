import { prismaClient } from "../utils/prisma_client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { FileRepository } from "./fileRepository";


interface IUser{
    id?: string;
    name?: string |null;
    email?: string;
    password?: string;
    contact?: string;
    avatarId?:string
};

interface ICreateUser{
    name: string | null;
    email: string;
    password: string
    contact: string;
}

export class UserRepository{
    fileRepository: FileRepository

    constructor(){
        this.fileRepository = new FileRepository()
    }

    async  find({id, email}: IUser){
        const user = await prismaClient.user.findUnique({where:{id,email}});

        return user;
    } 
    async create({name, email, password, contact}: ICreateUser){
        const user = await prismaClient.user.create({
            data: { name, email, password, contact},
        });

        return user;
    }


    async update({id, name, email, password,avatarId, contact}: IUser){
        const user = await prismaClient.user.update({
            where: {id, email},
            data: { name, email, password, contact, avatarId},
        });

        return user;
    }

    async  remove({ id, email}: IUser){
        const deletedUser = await prismaClient.user.delete({where:{id}});

        return deletedUser;
    }

   
};