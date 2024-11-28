import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import axiosInstance from '@/utils/axiosInstance';
import { Participant } from '@/types/participant';

interface UpdateParticipantData {
    id: string, updatedName: string
}

export const useUpdateParticipant = () => {
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: async (data: UpdateParticipantData,) => {
            const response = await axiosInstance.patch<Participant>(`/user/${data.id}`, { name: data.updatedName });
            return response.data;
        },
        onSuccess: () => {
            toast.success('Participant created successfully');
            queryClient.invalidateQueries({ queryKey: ['participants'] });
            queryClient.invalidateQueries({ queryKey: ['event'] });
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
        onError: (error) => {
            toast.error('Failed to create participant');
            console.error('Create error:', error);
        },
    });

    return {
        updateParticipant: updateMutation.mutate,
        isUpdatingParticipant: updateMutation.isPending,
    };
};