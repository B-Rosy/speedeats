import { FastifyReply, FastifyRequest } from "fastify";
import { FileRepository } from "../../repository/fileRepository";
import { UserRepository } from "../../repository/userRepository";
import {z} from "zod"

export async function uploadAvatar (request: FastifyRequest, reply: FastifyReply){
    const BodySchema = z.object({
        avatar: z.object({
            filename: z.string(),
            originalname: z.string()
        })
    });


    const { avatar } = BodySchema.parse(request.body);
    const { userId } = request;

    const fileRepository = new FileRepository()
    const userRepository = new UserRepository()

    const savedFile = await fileRepository.save(avatar);
    await userRepository.update({id:userId,  avatarId:savedFile.id });

    return reply.send(savedFile);
}
