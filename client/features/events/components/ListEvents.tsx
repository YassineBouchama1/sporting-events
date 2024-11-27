'use client'
import type { FC } from "react";
import useEventsList from "../hooks/useEventsList";
import EventCard from "./EventCard";
import EventCardSkeleton from "@/components/skeletons/EventCardSkeleton";
import Modal from "@/components/Modal";
import EventDetails from "./EventDetails";
import { useEventDetailStore } from "../store/eventDetailStore";

interface ListEventsProps { }

const ListEvents: FC<ListEventsProps> = ({ }) => {
  const { events, error, isLoading, refetch } = useEventsList(); // fetch events

  const { isModalDetailOpen, closeModalDetail } = useEventDetailStore()


  if (isLoading) {
    return <EventCardSkeleton />



  }

  // if there is any error display this 
  if (error) {
    return <div>There is error while try to fetch events <button onClick={() => refetch()}>Try Again</button></div>
  }

  return (
    <>
      {events && events.length > 0 ? (
        events.map((event) => <EventCard key={event._id} event={event} />)
      ) : (
        <p>No rooms available</p>
      )}
      <Modal isOpen={isModalDetailOpen} onClose={() => closeModalDetail()}>
        <EventDetails />
      </Modal>
    </>
  );
};

export default ListEvents;
