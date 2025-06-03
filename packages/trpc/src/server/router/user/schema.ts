import { z } from "zod";

// This schema is used to validate the user data

export const userIdSchema = z.object({
    id: z.string(),
});

export const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
});

export type IUser = z.infer<typeof createUserSchema>;
