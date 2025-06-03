import { procedure, router } from "../../lib/trpc";
import { User } from "./procedure";
import { createUserSchema, userIdSchema } from "./schema";

// This file defines the user router for handling user-related operations.
// It includes procedures for getting all users, getting a user by ID, creating a user, and deleting a user.

export const userRouter = router({
    getAllUser: procedure.query(new User().getAllUsers),
    getUserById: procedure
        .input(userIdSchema)
        .query((d) => new User().getUserById(d.input.id)),
    createUser: procedure
        .input(createUserSchema)
        .mutation((d) => new User().createUser(d.input)),
    deleteUser: procedure
        .input(userIdSchema)
        .query((d) => new User().deleteUser(d.input.id)),
});
