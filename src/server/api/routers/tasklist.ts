import { db } from "~/server/db";
import { protectedProcedure } from "../trpc";
import { createTRPCRouter } from "~/server/api/trpc";
import { z } from "zod";

const tasklist = z.object({
  name: z.string(),
});

export const tasklistRouter = createTRPCRouter({
  create: protectedProcedure
    .input(tasklist)
    .mutation(async ({ ctx, input }) => {
      const created = await db.tasklist.create({
        data: {
          name: input.name,
          userId: ctx.session?.user.id,
        },
      });
      return created;
    }),
  findMany: protectedProcedure.query(async ({ ctx }) => {
    const tasklists = await db.tasklist.findMany({
      where: {
        userId: ctx.session?.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return tasklists;
  }),
  delete: protectedProcedure.input(z.number()).mutation(async ({ input }) => {
    const deleted = await db.tasklist.delete({
      where: {
        id: input,
      },
    });
    return deleted;
  }),
});
