import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middleware/auth";
import * as controller from "../controller/paymentLog"

export async function paymentLogRoutes(fastify:FastifyInstance) {
    fastify.post("/", controller.create);
}