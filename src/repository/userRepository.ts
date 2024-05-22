import { User } from "@prisma/client";
import { prismaClient } from "../utils/prisma_client";

interface IUser{
    id?: string;
    name?: string |null;
    email?: string;
    password?: string;
    contact?: string;
};

interface ICreateUser{
    name: string | null;
    email: string;
    password: string
    contact: string;
}

export class UserRepository{

    async  find({id, email}: IUser){
        const user = await prismaClient.user.findUnique({where:{id}});

        return user;
    } 
    async create({name, email, password, contact}: ICreateUser){
        const user = await prismaClient.user.create({
            data: { name, email, password, contact},
        });

        return user;
    }


    async update({id, name, email, password, contact}: IUser){
        const user = await prismaClient.user.update({
            where: {id, email},
            data: { name, email, password, contact},
        });

        return user;
    }

    async  remove({ id, email}: IUser){
        const deletedUser = await prismaClient.user.delete({where:{id}});

        return deletedUser;
    }
};