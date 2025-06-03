import { appRouter } from "@repo/trpc/src/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

Bun.serve({
    routes: {
        "/api/trpc": (request) => {
            return fetchRequestHandler({
                endpoint: "/api/trpc",
                req: request,
                router: appRouter,
            });
        },
    },
});
