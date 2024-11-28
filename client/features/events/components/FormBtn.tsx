"use client";
import Modal from "@/components/Modal";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { useEventFormStore } from "../store/eventFormStore";
import CreateEvent from "./CreateEvent";



export default function FormBtn() {

  const { isModalOpen, openModal, closeModal } = useEventFormStore()


  return (
    <>
      <div
        onClick={() => openModal()}
        className="group bg-gray-900/30 py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/40 hover:smooth-hover"
      >
        <div className="bg-gray-900/70 text-white/50 group-hover:text-white group-hover:smooth-hover flex w-20 h-20 rounded-full items-center justify-center">
          <FaPlus />
        </div>
        <p className="text-white/50 group-hover:text-white group-hover:smooth-hover text-center">
          Create group
        </p>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => closeModal()}>
        <CreateEvent />
      </Modal>
    </>
  );
}
