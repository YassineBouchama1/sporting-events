import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";

const fetchEvents = async (): Promise<any[]> => {
    const response = await axiosInstance.get<any>('/events');
    return response.data;
};






const useEventsList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: events, isLoading, error } = useQuery<any[], Error>({
        queryKey: ['events'],
        queryFn: fetchEvents,
      
    });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return {
        events,
        isLoading,
        error,
    
        isModalOpen,
        openModal,
        closeModal,
       
    };
};

export default useEventsList;