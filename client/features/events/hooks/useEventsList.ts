import { Event } from "@/types/event";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchEvents = async (): Promise<Event[]> => {
    const response = await axiosInstance.get<Event[]>('/events');
    return response.data;
};






const useEventsList = () => {

    const { data: events, isLoading, error, refetch } = useQuery<Event[], Error>({
        queryKey: ['events'],
        queryFn: fetchEvents,

    });



    return {
        events,
        isLoading,
        error,
        refetch
    };
};

export default useEventsList;