import { FastifyInstance } from "fastify";
import { userRoutes } from "./user";
import { restaurantRoutes } from "./restaurant";
import { errorHandler } from "../middleware/errorHandler";
import fastifyStatic from "@fastify/static";
import path from "path";
import { paymentLogRoutes as paymentLogRoutes } from "./paymentLog";
import { authMiddleware } from "../middleware/auth";

export async function routes (fastify: FastifyInstance){

    const uploadsDir = path.resolve (__dirname, "..", "..", "uploads");
    fastify.register(fastifyStatic, {
        root:uploadsDir,
        prefix: "/public" 
    });

    fastify.setErrorHandler(errorHandler);

    fastify.register(userRoutes, {prefix:"/user"});

    fastify.addHook("preHandler", authMiddleware)
    
    fastify.register(restaurantRoutes, {prefix:"/restaurant"})
    fastify.register(paymentLogRoutes, {prefix:"/paymentLog"});

};

