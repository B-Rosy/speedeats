import Fastify from "fastify";
import { routes } from "./routes";
import fastifyMultipart from "@fastify/multipart";

const fastify = Fastify();


fastify.register(fastifyMultipart, {attachFieldsToBody: true});    
fastify.register(routes, {prefix:"/api/v1"});


fastify.listen({ port: 3000 }, (err, address) => {
    if (err) throw err;
        console.log("Server is now listening on 3000");
 });


    