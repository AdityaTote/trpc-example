import { prisma } from "@repo/db/src";
import type { IUser } from "../router/user/schema";

// This file defines the UserService class which contains methods to interact with user data.
// It uses Prisma to perform operations like fetching, creating, updating, and deleting users.

export class UserService {
    public static async getAllUser() {
        return await prisma.user.findMany();
    }

    public static async getUserById(id: string) {
        return await prisma.user.findUnique({ where: { id } });
    }

    public static async createUser(data: IUser) {
        return await prisma.user.create({ data });
    }

    public static async updateUser(id: string, data: Partial<IUser>) {
        return await prisma.user.update({ where: { id }, data });
    }

    public static async deleteUser(id: string) {
        return await prisma.user.delete({ where: { id } });
    }
}
