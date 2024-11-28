import { Event, EventFormUpdateData } from "@/types/event";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useEventDetails = (eventId: string) => {
    const queryClient = useQueryClient();


    const {
        data: event,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["event", eventId],
        queryFn: async () => {
            const response = await axiosInstance.get<Event>(`/events/${eventId}`);
            return response.data;
        },
        enabled: !!eventId, // fetch onlyeventid ava
    });

    interface UpdateEventData extends EventFormUpdateData {
        participants?: string[]
    }


    const updateMutation = useMutation({
        mutationFn: async (data: UpdateEventData) => {
            const response = await axiosInstance.patch(`/events/${eventId}`, data);
            return response.data;
        },
        onSuccess: () => { // after successfully  update event update venets list
            toast.success("Event updated successfully");
            queryClient.invalidateQueries({ queryKey: ["events", eventId] });
            queryClient.invalidateQueries({ queryKey: ["event", eventId] });
        },
        onError: (error) => {
            toast.error("Failed to update event");
            console.error("Update error:", error);
        },
    });



    return {
        event,
        isLoading,
        error,
        updateEvent: updateMutation.mutate,
        isUpdating: updateMutation.isPending,

    };
};

export default useEventDetails;