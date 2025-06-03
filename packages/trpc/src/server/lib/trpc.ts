import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";

/*
 * Creates a new tRPC instance with SuperJSON transformer configuration.
 * 
 * This instance serves as the foundation for building type-safe API endpoints.
 * The SuperJSON transformer enables serialization and deserialization of complex
 * JavaScript types (like Dates, RegExp, etc.) that are not natively supported
 * by JSON, ensuring data integrity between client and server communications.
 * 
 * @remarks
 * SuperJSON automatically handles the conversion of non-JSON-serializable types,
 * making it seamless to work with rich data types across the network boundary.
 */
const trpc = initTRPC.create({
    // transformer in the options is responsible for serializing and deserializing data between your client and server
    transformer: SuperJSON,
});

export const router = trpc.router; /* create a route like api endpoint */
export const procedure = trpc.procedure; /* creates a controller/function which can be call for the routes. It is attached to the routes  */
export const middleware = trpc.middleware; /* creates a middleware which can be used to add additional logic to the routes. It is attached to the routes */