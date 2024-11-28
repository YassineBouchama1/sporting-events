import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { User } from "@/types/user";

export const useParticipants = () => {
    return useQuery({
        queryKey: ['participants'],
        queryFn: async () => {
            const response = await axiosInstance.get<User[]>('/user');
            return response.data;
        },

    });
};