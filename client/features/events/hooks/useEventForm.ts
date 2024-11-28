'use client';

import { useCallback, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { EventFormCreateData, EventFormCreateSchema } from '@/types/event';
import { useParticipants } from '@/hooks/useParticipants';
import { useEventFormStore } from '../store/eventFormStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/utils/axiosInstance';
import { delay } from '@/utils';

export const useEventForm = () => {
    const queryClient = useQueryClient();
    const { closeModal } = useEventFormStore();
    const { data: participants = [], isLoading: isLoadingParticipants } = useParticipants();

    // mfunction for mutation create event
    const createEventFn = useCallback(async (data: EventFormCreateData) => {

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
            participantIds: [] as string[],
        },
    }), []);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
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

        createEvent(data);
    }, [createEvent]);


    // refactore data participants for selector
    const participantOptions = useMemo(() =>
        participants.map((user) => ({
            value: user._id,
            label: user.name
        }))
        , [participants]);


    // memorize all functions to avoid rerande
    const formHandlers = useMemo(() => ({
        register,
        handleSubmit,
        control,
        errors,
        isPending,
        isLoadingParticipants,
        participantOptions,
        onSubmit
    }), [
        register,
        handleSubmit,
        control,
        errors,
        isPending,
        isLoadingParticipants,
        participantOptions,
        onSubmit
    ]);

    return formHandlers;
};