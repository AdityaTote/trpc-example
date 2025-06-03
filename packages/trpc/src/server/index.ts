import { router } from "./lib/trpc";
import { routes } from "./router";

// This file defines the main router for the tRPC server.
// It combines all sub-routers into a single router for the application.

export const appRouter = router({
    router: routes,
});

export type AppRouter = typeof appRouter;
