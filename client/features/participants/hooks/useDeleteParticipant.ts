import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import axiosInstance from '@/utils/axiosInstance';


export const useDeleteParticipant = () => {
    const queryClient = useQueryClient();


    const deleteMutation = useMutation({
        mutationFn: async (participantId: string) => {
            await axiosInstance.delete(`/user/${participantId}`);
        },
        onSuccess: () => {

            // after delete invalide 
            toast.success('Participant deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['participants'] });
            queryClient.invalidateQueries({ queryKey: ["event"] });
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
        onError: (error) => {
            toast.error('Failed to delete participant');
            console.error('Delete error:', error);
        },
    });

    return {
        deleteParticipant: deleteMutation.mutate,
        isDeletingParticipant: deleteMutation.isPending,
    };
};