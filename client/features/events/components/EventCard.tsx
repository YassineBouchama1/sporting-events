"use client";

import Image from "next/image";
import { memo, useMemo } from "react";
import { RiDeleteBin6Line, RiFileDownloadLine, RiLoader2Fill } from "react-icons/ri";
import Button from "@/components/Button";
import { Event } from "@/types/event";
import { useDeleteEvent } from "../hooks/useDeleteEvent";
import { useEventPDF } from "@/hooks/useEventsPDF";
import { useEventDetailStore } from "../store/eventDetailStore";

interface EventCardProps {
  event: Event;
}

const EventCard = memo(({ event }: EventCardProps) => {
  const { handleDelete, isLoading } = useDeleteEvent();
  const { generatePDF, isGenerating } = useEventPDF({ event }); // call function to generate pdf 
  const { setEvent } = useEventDetailStore()



  const downloadButton = useMemo(() => (
    <div className="flex justify-between items-center">

      <Button
        onClick={generatePDF}
        disabled={isGenerating}
        style="text-purple-400 hover:text-purple-300 hover:bg-transparent flex items-center gap-2 bg-transparent"
      >
        {isGenerating ? (
          <>
            <RiLoader2Fill className="animate-spin " />
            Generating...
          </>
        ) : (
          <>
            <RiFileDownloadLine />
            Download List
          </>
        )}
      </Button>
    </div>
  ), [generatePDF, isGenerating]);

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
        <Button
          onClick={() => setEvent(event._id)} // on click open event details
          type="button">
          View
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


      {downloadButton}

    </div>
  );
});

EventCard.displayName = "EventCard";

export default EventCard;