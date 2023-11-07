import { db } from "~/server/db";
import { protectedProcedure } from "../trpc";
import { createTRPCRouter } from "~/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
    findOne: protectedProcedure.input(z.string()).query( async ({ctx}) => {
        const user = await db.user.findUnique({
            where: {
                id: ctx.session?.user.id
            }
        })
        return user
    })
})
