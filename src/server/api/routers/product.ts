import { Prisma } from "@prisma/client";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { formSchema } from "~/components/addProductForm";

export const productRouter = createTRPCRouter({
  create: protectedProcedure
    .input(formSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.auth.userId;
        const { name, description, barcode, price, category, imageSrc } = input;

        const productData = {
          name,
          description,
          barcode,
          price,
          categoryId: category.value,
          imageSrc,
          userId,
        };

        await ctx.prisma.product.create({ data: productData });
      } catch (err) {
        console.error(err);
      }
    }),
});
