import { FastifyInstance } from "fastify";
import * as controller from "../controller/restaurant";

export function restaurantRoutes(fastify:FastifyInstance){
    fastify.post ("/",controller.create)
}