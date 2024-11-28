'use client'
import type { FC } from "react";
import useEventsList from "../hooks/useEventsList";
import EventCard from "./EventCard";
import EventCardSkeleton from "@/components/skeletons/EventCardSkeleton";
import Modal from "@/components/Modal";
import EventDetails from "./EventDetails";
import { useEventDetailStore } from "../store/eventDetailStore";


const ListEvents: FC = ({ }) => {
  const { events, error, isLoading, refetch } = useEventsList(); // fetch events

  const { isModalDetailOpen, closeModalDetail } = useEventDetailStore()


  if (isLoading) {
    return <EventCardSkeleton />



  }

  // if there is any error display this 
  if (error) {
    return <div className="text-white font-extrabold">There is error while try to fetch events <button onClick={() => refetch()}>Try Again</button></div>
  }

  return (
    <>


      {events && events.length > 0 ? (
        events.map((event) => <EventCard key={event._id} event={event} />)
      ) : (
        <p>No Event available</p>
      )}

      <Modal isOpen={isModalDetailOpen} onClose={() => closeModalDetail()}>
        <EventDetails />
      </Modal>
    </>
  );
};

export default ListEvents;
