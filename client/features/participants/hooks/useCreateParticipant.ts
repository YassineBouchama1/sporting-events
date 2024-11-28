import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import axiosInstance from '@/utils/axiosInstance';
import { Participant } from '@/types/participant';

interface CreateParticipantData {
  email: string;
  name: string;
}

export const useCreateParticipant = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
      mutationFn: async (data: CreateParticipantData) => {
          const response = await axiosInstance.post<Participant>('/user', data);
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
      createParticipant: createMutation.mutate,
      isCreatingParticipant: createMutation.isPending,
  };
};