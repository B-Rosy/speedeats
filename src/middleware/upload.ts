import { randomUUID } from "crypto";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import fs from "fs"
import { error } from "console";

export async function uploadMiddleware (

    request: FastifyRequest, 
    reply: FastifyReply, 
    done: (error?: FastifyError) => void){

        const avatar = request.body.avatar;
        const filename=`${randomUUID()} - ${avatar.filename}`;
        const filepath = path.resolve(__dirname,"..", "..", "upload", filename);
        fs.promises.writeFile(filepath, avatar._buf)
            .then((res)=>{

                done();

            }).catch((error)=>{
                reply.status(400).send({error:"failed upload"
                })
            })

    };