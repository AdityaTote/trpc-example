import { trpc } from "@repo/trpc/src/client";

export const useGetAllUser = () => {
    return trpc.router.users.getAllUser.useQuery();
};

export const useGetUserById = (id: string) => {
    return trpc.router.users.getUserById.useQuery({ id });
};

export const useCreateUser = () => {
    return trpc.router.users.createUser.useMutation();
};

export const useDeleteUser = (id: string) => {
    return trpc.router.users.deleteUser.useQuery({ id });
};
