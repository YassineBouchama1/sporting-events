// import { useDeleteRoomMutation } from "@/services/apis/roomApiSlice";
// import { useCallback } from "react";
// import toast from "react-hot-toast";

// export const useDeleteEvent = () => {
//   const [deleteRoom, { isLoading, error }] = useDeleteEventMutation();

//   const handleDelete = useCallback(
//     async (roomId:string) => {
//       try {
//         await deleteRoom(roomId).unwrap();
//         toast.success("Room deleted successfully!");
//       } catch (err:any) {
//         toast.error(err.data?.message || "Failed to delete room");
//         console.error("Error deleting room:", err);
//       }
//     },
//     [deleteRoom]
//   );

//   return { handleDelete, isLoading, error };
// };
