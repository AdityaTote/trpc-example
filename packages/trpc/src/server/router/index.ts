import { router } from "../lib/trpc";
import { userRouter } from "./user/router";

// This file defines the main router for the tRPC server.
//  THis file contains sub-routers for users.

export const routes = router({
    users: userRouter,
});
