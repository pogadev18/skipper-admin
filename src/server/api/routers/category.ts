import { Prisma } from "@prisma/client";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { formSchema } from "~/components/addCategoryForm";
import { TRPCError } from "@trpc/server";

export const categoryRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  create: protectedProcedure
    .input(formSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.auth.userId;

        const categoryData = {
          category: input.category,
          userId,
        };

        await ctx.prisma.category.create({ data: categoryData });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new TRPCError({
              code: "CONFLICT",
              message: `You cannot create another category with the same name: "${input.category}"`,
            });
          }
        }
      }
    }),
});
