import { PrismaClient } from "@prisma/client";

interface SaveFileProps {
    filename :string;
    originalname: string;
}

export class FileRepository{
  
   async save({filename, originalname }:SaveFileProps){
    const client = new PrismaClient();

        const savedFile = await client.file.create({
            data: {
                filename,
                originalname
            }
        });

        return savedFile;
    }
}