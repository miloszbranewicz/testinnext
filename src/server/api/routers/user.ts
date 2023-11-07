import { db } from "~/server/db";
import { protectedProcedure, publicProcedure  } from "../trpc";
import { createTRPCRouter } from "~/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
    findOne: protectedProcedure.input(z.string()).query( async ({ctx, input }) => {
        const user = await db.user.findUnique({
            where: {
                id: ctx.session?.user.id
            }
        })
        return user
    })
})
