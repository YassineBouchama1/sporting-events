"use client";
import Modal from "@/components/Modal";
import React, { useState } from "react";
import RoomForm from "./RoomForm";
import { FaPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeModal, openModal } from "@/redux/slices/modalSlice";


export default function FormBtn() {
 const dispatch = useAppDispatch();
 const isOpen = useAppSelector((state) => state.modal.isOpen);

 
  return (
    <>
      <div
        onClick={() => dispatch(openModal())}
        className="group bg-gray-900/30 py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/40 hover:smooth-hover"
      >
        <div className="bg-gray-900/70 text-white/50 group-hover:text-white group-hover:smooth-hover flex w-20 h-20 rounded-full items-center justify-center">
          <FaPlus />
        </div>
        <p className="text-white/50 group-hover:text-white group-hover:smooth-hover text-center">
          Create group
        </p>
      </div>

      <Modal isOpen={isOpen} onClose={() => dispatch(closeModal())}>
        <RoomForm />
      </Modal>
    </>
  );
}
