import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import axiosInstance from '@/utils/axiosInstance';


interface DeleteParticipantVariables {
    participantId: string;
    eventId: string;
}

export const useDeleteParticipant = () => {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: async ({ participantId, eventId }: DeleteParticipantVariables) => {
            await axiosInstance.delete(`events/${eventId}/participants/${participantId}`);
        },
        onSuccess: () => {
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

    const deleteParticipant = (participantId: string, eventId: string) => {
        deleteMutation.mutate({ participantId, eventId });
    };

    return {
        deleteParticipant,
        isDeletingParticipant: deleteMutation.isPending,
    };
};