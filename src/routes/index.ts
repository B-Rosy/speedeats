import "../../../../"
import { FastifyInstance } from "fastify";
import { userRoutes } from "./user";
import { restaurantRoutes } from "./restaurant";

export async function routes (fastify: FastifyInstance){

    fastify.register(userRoutes, {prefix:"/user"});
    fastify.register(restaurantRoutes, {prefix:"restaurant"})

};
