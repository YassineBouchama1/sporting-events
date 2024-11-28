'use client';

import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { EventFormCreateData, EventFormCreateSchema } from '@/types/event';
import { useEventFormStore } from '../store/eventFormStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/utils/axiosInstance';
import { delay } from '@/utils';


interface CreateEventData extends EventFormCreateData {
    participantIds?: string[]
}


export const useEventForm = () => {
    const queryClient = useQueryClient();
    const { closeModal } = useEventFormStore();
    const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);

    // mfunction for mutation create event
    const createEventFn = useCallback(async (data: CreateEventData) => {

        await delay(2000) // add delay to check loading 
        const response = await axiosInstance.post('/events', data);
        return response.data;
    }, []);

    //  handle on succfess create event
    const onMutationSuccess = useCallback(() => {
        toast.success("Event created successfully");
        queryClient.invalidateQueries({ queryKey: ["events"] }); // after successfuy revalidate events list
        closeModal();
    }, [queryClient, closeModal]);



    // handle error
    const onMutationError = useCallback((error: Error) => {
        toast.error("Failed to create event");
        console.error("Create error:", error);
    }, []);



    const { mutate: createEvent, isPending } = useMutation({
        mutationFn: createEventFn,
        onSuccess: onMutationSuccess,
        onError: onMutationError,
    });

    // setup  form configuration 
    const formConfig = useMemo(() => ({
        resolver: zodResolver(EventFormCreateSchema),
        defaultValues: {
            name: '',
            startDate: '',
            endDate: '',
            status: 'PUBLIC' as const,

        },
    }), []);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },

    } = useForm<EventFormCreateData>(formConfig);





    // hanlde on submit 
    const onSubmit = useCallback(async (data: EventFormCreateData) => {
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
        // chekc if date validate
        if (endDate <= startDate) {
            toast.error('End date must be after start date');
            return;
        }

        console.log(data)
        createEvent({ ...data, participantIds: selectedParticipants });
    }, [createEvent, selectedParticipants]);





    // memorize all functions to avoid rerande
    const formHandlers = useMemo(() => ({
        register,
        handleSubmit,
        control,
        errors,
        isPending,
        setSelectedParticipants,
        selectedParticipants,
        onSubmit
    }), [
        register,
        handleSubmit,
        control,
        errors,
        isPending,
        setSelectedParticipants,
        selectedParticipants,
        onSubmit
    ]);

    return formHandlers;
};