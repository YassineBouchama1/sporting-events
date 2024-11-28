
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import axiosInstance from '@/utils/axiosInstance';
import { Participant } from '@/types/participant';


export const useParticipants = () => {

    const { data: participants = [], isLoading } = useQuery({
        queryKey: ['participants'],
        queryFn: async () => {
            const response = await axiosInstance.get<Participant[]>('/user');
            return response.data;
        },
    });


    return {
        participants,
        isLoading,

    };
};