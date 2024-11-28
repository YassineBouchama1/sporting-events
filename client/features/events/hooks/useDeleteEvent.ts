/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { delay } from "@/utils";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";


const deleteEventApi = async (eventId: string) => {
    await delay(2000) // add delay to check loading 
    const response = await axiosInstance.delete(`/events/${eventId}`);
    return response.data;
};


export const useDeleteEvent = () => {
    const queryClient = useQueryClient();


    const toastConfig = useMemo(
        () => ({
            success: {
                duration: 4000,
                style: {
                    background: "#333",
                    color: "#fff",
                },
            },
            error: {
                duration: 4000,
                style: {
                    background: "#FF4444",
                    color: "#fff",
                },
            },
        }),
        []
    );

    // this is delete mutation
    const deleteMutation = useMutation({
        mutationFn: deleteEventApi,
        onSuccess: () => {

            // after succeffully even deleted refrech list of thata
            queryClient.invalidateQueries({ queryKey: ["events"] });
            toast.success("Event deleted successfully!", toastConfig.success);
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || "Failed to delete event";
            toast.error(errorMessage, toastConfig.error);
            console.error("Error deleting event:", error);
        },
    });

    //  hanlde delete
    const handleDelete = useCallback(
        async (eventId: string) => {
            deleteMutation.mutate(eventId);
        },
        [deleteMutation]
    );

    return {
        handleDelete,
        isLoading: deleteMutation.isPending,
        error: deleteMutation.error,
    };
};