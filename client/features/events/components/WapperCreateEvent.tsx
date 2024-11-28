'use client'
import type { FC } from "react";

import Modal from "@/components/Modal";

import CreateEvent from "./CreateEvent";
import { useEventFormStore } from "../store/eventFormStore";



const WapperCreateEvent: FC = ({ }) => {

    const { isModalOpen, closeModal } = useEventFormStore()




    return (
        <>
            <Modal isOpen={isModalOpen} onClose={() => closeModal()}>
                <CreateEvent />
            </Modal>
        </>

    );
};

export default WapperCreateEvent;
