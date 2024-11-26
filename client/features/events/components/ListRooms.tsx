'use client'
import { useGetRoomsQuery } from "@/services/apis/roomApiSlice";
import type { FC } from "react";
import RoomCard from "./RoomCard";

interface ListRoomsProps {}

const ListRooms: FC<ListRoomsProps> = ({}) => {
  const { data: rooms, error, isLoading } = useGetRoomsQuery();

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    // Extract relevant information from the error object for display
    const errorMessage =
      "status" in error
        ? `Error: ${error.status} - ${
            (error.data as any)?.message || "Unknown error"
          }`
        : "An unexpected error occurred.";
    return <div>{errorMessage}</div>;
  }

  return (
  <>
      {rooms && rooms.length > 0 ? (
          rooms.map((room) => <RoomCard key={room._id} room={room} />)
        ) : (
            <p>No rooms available</p>
        )}
 
        </>
  );
};

export default ListRooms;
