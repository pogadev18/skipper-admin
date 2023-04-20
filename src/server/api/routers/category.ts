import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { formSchema } from "~/components/addCategoryForm";

export const categoryRouter = createTRPCRouter({
  create: protectedProcedure
    .input(formSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.userId;

      const data = {
        category: input.category,
        userId,
      };

      await ctx.prisma.category.create({ data });
    }),
});
