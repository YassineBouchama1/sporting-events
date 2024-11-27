
import { create } from 'zustand';



interface EventStore {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;

}

export const useEventStore = create<EventStore>((set) => ({
    isModalOpen: false,
    currentModal: null,

    openModal: () => set({ isModalOpen: true, }),
    closeModal: () => set({ isModalOpen: false }),

}));