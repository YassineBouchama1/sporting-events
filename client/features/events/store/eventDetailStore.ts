
import { Event } from '@/types/event';
import { create } from 'zustand';



interface EventDetailStore {
    isModalDetailOpen: boolean;
    openModalDetail: () => void;
    closeModalDetail: () => void;
    eventId: string | null;
    setEvent: (eventId: string) => void;
}

export const useEventDetailStore = create<EventDetailStore>((set) => ({
    isModalDetailOpen: false,
    currentModal: null,
    eventId: null,
    openModalDetail: () => set({ isModalDetailOpen: true, }),
    closeModalDetail: () => set({ isModalDetailOpen: false }),
    setEvent: (eventId: string) => set({ eventId, isModalDetailOpen: true, }),
}));