import { httpBatchLink, httpLink, splitLink } from "@trpc/react-query";
import type { AppRouter } from "../server";
import { useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SuperJSON from "superjson";
import { TRPC_URL } from "../lib/config";
import { createTRPCReact } from "@trpc/react-query";

/*
 * This file sets up the tRPC client for the application.
 * It configures the client with links for handling HTTP requests and batching,
 * and provides a React context for using tRPC hooks in components.
 */

// creatte a tRPC react client with the AppRouter type
export const trpc = createTRPCReact<AppRouter>({
    overrides: {
        // Override the default useMutation behavior to handle query invalidation
        useMutation: {
            // This function is called when the mutation is successful
            async onSuccess(opts) {
                // If the original function is not provided, return early
                await opts.originalFn();
                // If the meta data specifies not to invalidate queries, return early
                if (opts.meta.doNotInvalidateQueryOnMutation) {
                    return;
                }
                // Invalidate all queries besides ones that specify not to in the meta data.
                await opts.queryClient.invalidateQueries({
                    predicate: (query) =>
                        !query?.meta?.doNotInvalidateQueryOnMutation,
                });
            },
        },
    },
});

export interface TrpcProviderProps {
    children: React.ReactNode;
    headers?: Record<string, string>;
}

// This component provides the tRPC client and tanstack query client to the React application.
export function TrpcProvider({ children, headers }: TrpcProviderProps) {
    const [queryClient] = useState(() => new QueryClient());

    // May cause remounting issues.
    const trpcClient = useMemo(
        () =>
            // Create a tRPC client with split links for batching and non-batching requests
            trpc.createClient({
                links: [
                    // Split the link based on the context's skipBatch property
                    splitLink({
                        condition: (op) => op.context.skipBatch === true,
                        // If skipBatch is true, use the httpLink for non-batched requests
                        true: httpLink({
                            url: `${TRPC_URL}/api/trpc`,
                            headers,
                            transformer: SuperJSON,
                        }),
                        // If skipBatch is false, use the httpBatchLink for batching requests
                        false: httpBatchLink({
                            url: `${TRPC_URL}/api/trpc`,
                            headers,
                            transformer: SuperJSON,
                        }),
                    }),
                ],
            }),
        [headers]
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
}
