import { randomUUID } from "crypto";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import fs from "fs"

export function uploadMiddleware (field: string){
    
    return (request: FastifyRequest, 
    reply: FastifyReply, 
    done: (error?: FastifyError) => void) => {

        const body = request.body

        const file = request.body[field];

        const fileName=`${randomUUID()} - ${file.filename}`.replace(/ /g, "_");
        const filepath = path.resolve(__dirname,"..", "..", "upload", fileName);

        fs.promises
            .writeFile(filepath, file._buf)
            .then(()=>{
                const body = Object.fromEntries(Object.keys(request.body).map((key)=> [key, request.body[key].value]))
                body[field] ={
                    filename:fileName,
                    originalName: file.filename
                };
                request.body =body;
                
                done();

            })
            .catch((error)=>{
               return  reply.status(400).send({error:"failed upload"
                });
            });
    };
}