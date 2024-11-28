
import { create } from 'zustand';



interface PaticipantFormStore {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;

}

export const usePaticipantFormStore = create<PaticipantFormStore>((set) => ({
    isModalOpen: false,
    currentModal: null,
    openModal: () => set({ isModalOpen: true, }),
    closeModal: () => set({ isModalOpen: false }),

}));