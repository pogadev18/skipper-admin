import { createTRPCRouter } from "~/server/api/trpc";
import { categoryRouter } from "./routers/category";

export const appRouter = createTRPCRouter({
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
