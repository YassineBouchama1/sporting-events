"use client";

import Button from "@/components/Button";
import Input from "@/components/inputs/Input";
import PlaylistUrlInput from "./PlaylistUrlInput";
import { RiLoader2Fill } from "react-icons/ri";
import { useRoomForm } from "../hooks/useRoomForm";

export default function RoomForm() {
  const {
    roomForm,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    errorsApi,
    playlistUrls,
    setPlaylistUrls,
    isVisible,
    setIsVisible,
  } = useRoomForm();

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

      {errorsApi && (
        <div className="flex items-center justify-center w-full mt-5 bg-red-500 text-white text-sm py-1 px-3 rounded-md mb-2">
          {errorsApi}
        </div>
      )}

      <div className="mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-y-4">
            <Input
              register={roomForm}
              errors={errors}
              required={false}
              id="name"
              label="ROOM NAME"
            />

            <PlaylistUrlInput
              onChange={setPlaylistUrls}
              className="max-w-2xl mx-auto"
            />

            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isVisible}
                    onChange={(e) => setIsVisible(e.target.checked)}
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 rounded ${
                      isVisible ? "bg-purple-500" : "bg-gray-700"
                    } flex items-center justify-center`}
                  >
                    {isVisible && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-white">
                    Make room visible to friends and their friends
                  </p>
                  {/* <p className="text-gray-400 text-sm">
                    This will display the room card on their home page. They
                    will be required to "knock" if they want to join, however.
                  </p> */}
                </div>
              </label>
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                Join with link
              </button>

              <Button disabled={isLoading} type="submit">
                Create {isLoading && <RiLoader2Fill className="animate-spin" />}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
