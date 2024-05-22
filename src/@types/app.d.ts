import { User } from "@prisma/client";

export interface IUpdateUser extends User{
        newPassword: string;
        oldPassword: string;
};