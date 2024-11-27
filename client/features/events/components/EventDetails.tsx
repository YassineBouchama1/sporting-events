"use client";

import Image from "next/image";
import { memo, useMemo } from "react";
import { RiDeleteBin6Line, RiLoader2Fill } from "react-icons/ri";
import Button from "@/components/Button";
import { Event } from "@/types/event";
import { useDeleteEvent } from "../hooks/useDeleteEvent";

interface EventDetailsProps {
  event: Event;
}

const EventDetails = memo(({ event }: EventDetailsProps) => {
  const { handleDelete, isLoading } = useDeleteEvent();

  // he i memrize btn delete
  const deleteButtonContent = useMemo(
    () =>
      isLoading ? (
        <div className="flex gap-x-2 items-center">
          <RiLoader2Fill className="animate-spin" />
          Deleting
        </div>
      ) : (
        <div className="flex gap-x-2 items-center">
          <RiDeleteBin6Line />
          Delete
        </div>
      ),
    [isLoading]
  );

  // here i memrize status display  to avoid uncessry rerande
  const statusDisplay = useMemo(
    () => (
      <p className="absolute top-[-2px] text-white/20 inline-flex items-center text-xs">
        {event.status === "PUBLIC" ? "Online" : "Offline"}{" "}
        <span
          className={`ml-2 w-4 h-4 block ${event.status === "PUBLIC" ? "bg-green-500" : "bg-red-500"
            } rounded-full group-hover:animate-pulse`}
        ></span>
      </p>
    ),
    [event.status]
  );


  const actionButtons = useMemo(
    () => (
      <div className="flex justify-center gap-x-3 items-center">
        <Button
          onClick={() => handleDelete(event._id)}
          disabled={isLoading}
          danger
        >
          {deleteButtonContent}
        </Button>
        <Button disabled={isLoading} type="button">
          Update
        </Button>
      </div>
    ),
    [event._id, handleDelete, isLoading, deleteButtonContent]
  );

  return (
    <div className="relative group bg-gray-900 py-4 flex flex-col space-y-4 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
      <Image
        className="w-20 h-20 object-cover object-center rounded-full"
        src={event.logo}
        alt={event.name}
        width={100}
        height={100}
      />

      <h4 className="text-white text-2xl font-bold capitalize text-center truncate">
        {event.name}
      </h4>

      <p className="text-white/50 truncate max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
        {event.participants.length} participants
      </p>

      {statusDisplay}
      {actionButtons}

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
          Download All participants
        </button>
      </div>
    </div>
  );
});

EventDetails.displayName = "EventDetails";

export default EventDetails;