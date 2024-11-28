/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { memo, useCallback, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { RiLoader2Fill } from 'react-icons/ri';
import Button from '@/components/Button';
import Input from '@/components/inputs/Input';
import Select from '@/components/inputs/Select';
import { useEventForm } from '../hooks/useEventForm';

const CreateEvent = memo(() => {
    const {
        register,
        handleSubmit,
        control,
        errors,
        isPending,
        isLoadingParticipants,
        participantOptions,
        onSubmit
    } = useEventForm();

    // here imemoized participant selection handler to avoid rerande
    const handleParticipantChange = useCallback((selectedOptions: any) => {
        const selectedIds = Array.isArray(selectedOptions)
            ? selectedOptions.map(option => option.value)
            : [];
        return selectedIds;
    }, []);

    //  cached status
    const statusOptions = useMemo(() => [
        { value: 'PUBLIC', label: 'Public' },
        { value: 'PRIVATE', label: 'Private' }
    ], []);

    // memorz button content
    const ButtonContent = memo(({ isPending }: { isPending: boolean }) => (
        isPending ? (
            <div className="flex items-center gap-2">
                <RiLoader2Fill className="animate-spin" />
                Creating...
            </div>
        ) : (
            'Create Event'
        )
    ));
    ButtonContent.displayName = 'ButtonContent';

    return (
        <div className="bg-gray-900 p-6 rounded-lg">
            <h1 className="text-2xl font-bold text-white mb-6">Create New Event</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                    label="Event Name"
                    id="name"
                    register={register}
                    errors={errors}
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Start Date"
                        id="startDate"
                        type="datetime-local"
                        register={register}
                        errors={errors}
                    />
                    <Input
                        label="End Date"
                        id="endDate"
                        type="datetime-local"
                        register={register}
                        errors={errors}
                    />
                </div>


                <div className="flex items-center space-x-4">
                    <label className="text-white">Status:</label>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <select
                                {...field}
                                className="bg-gray-800 text-white rounded px-2 py-1"
                            >
                                {statusOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    {errors.status && (
                        <span className="text-red-500 text-sm">
                            {errors.status.message}
                        </span>
                    )}
                </div>
             

                <Controller
                    name="participantIds"
                    control={control}
                    render={({ field }) => (
                        <Select
                            label="Participants"
                            disabled={isLoadingParticipants}
                            value={field.value?.map(id =>
                                participantOptions.find(option => option.value === id)
                            ).filter(Boolean) || []}
                            onChange={(selectedOptions) => {
                                field.onChange(handleParticipantChange(selectedOptions));
                            }}
                            options={participantOptions}
                        />
                    )}
                />
                {errors.participantIds && (
                    <span className="text-red-500 text-sm">
                        {errors.participantIds.message}
                    </span>
                )}

                <div className="flex justify-end gap-4 mt-6">
                    <Button
                        type="submit"
                        disabled={isPending || isLoadingParticipants}
                    >
                        <ButtonContent isPending={isPending} />
                    </Button>
                </div>
            </form>
        </div>
    );
});

CreateEvent.displayName = "CreateEvent";

export default CreateEvent;