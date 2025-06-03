import { UserService } from "../../services/user.service";
import type { IUser } from "./schema";

// This file defines the User class which contains methods to interact with user data.
// It uses the UserService to perform operations like fetching, creating, and deleting users.

export class User {
    public async getAllUsers() {
        const user = await UserService.getAllUser();
        if (!user) {
            return {
                success: false,
                message: "users not found",
            };
        }
        return {
            success: true,
            message: "user fetch successfully",
            data: user,
        };
    }

    public async getUserById(id: string) {
        const user = await UserService.getUserById(id);
        if (!user) {
            return {
                success: false,
                message: "user not found",
            };
        }

        return {
            success: true,
            message: "users fetched successfully",
            data: user,
        };
    }

    public async createUser(data: IUser) {
        const user = await UserService.createUser(data);
        if (!user) {
            return {
                success: false,
                message: "users not created",
            };
        }
        return {
            success: true,
            message: "users created successfully",
        };
    }

    public async deleteUser(id: string) {
        const user = await UserService.deleteUser(id);
        if (!user) {
            return {
                success: false,
                message: "users not found",
            };
        }
        return {
            success: true,
            message: "user deleted successfully!",
        };
    }
}
