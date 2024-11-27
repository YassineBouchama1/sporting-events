
import { create } from 'zustand';



interface EventFormStore {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;

}

export const useEventFormStore = create<EventFormStore>((set) => ({
    isModalOpen: false,
    currentModal: null,
    openModal: () => set({ isModalOpen: true, }),
    closeModal: () => set({ isModalOpen: false }),

}));