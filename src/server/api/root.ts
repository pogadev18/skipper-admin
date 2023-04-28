import { createTRPCRouter } from "~/server/api/trpc";
import { categoryRouter } from "./routers/category";
import { productRouter } from "./routers/product";

export const appRouter = createTRPCRouter({
  category: categoryRouter,
  product: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
