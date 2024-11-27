"use client";

import Button from "@/components/Button";
import Input from "@/components/inputs/Input";
import PlaylistUrlInput from "./PlaylistUrlInput";
import { RiLoader2Fill } from "react-icons/ri";


export default function EventForm() {
  // const {

  //   handleSubmit,
  //   onSubmit,
  //   errors,
  //   isLoading,
  //   errorsApi,
  //   playlistUrls,
  //   setPlaylistUrls,
  //   isVisible,
  //   setIsVisible,
  // } = useEventForm();

  return (
    <div className="p-4 sm:p-2">
      <div className="text-left flex justify-start gap-x-6 items-center">
        <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>

        <h1 className="block text-white text-2xl font-bold">Create Room</h1>



      </div>
    </div>
  );
}
