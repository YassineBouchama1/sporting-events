"use client";

import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiLoader2Fill, RiEditLine, RiSaveLine, RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";
import Button from "@/components/Button";
import Input from "@/components/inputs/Input";
import useEventDetails from "../hooks/useEventDetails";
import { useEventPDF } from "@/hooks/useEventsPDF";
import { useEventDetailStore } from "../store/eventDetailStore";
import { formatDateTime } from "@/utils";
import { EventFormUpdateData, EventFormUpdateSchema } from "@/types/event";
import ParticipantsSelector from "@/components/ParticipantsSelector";
import { useDeleteParticipant } from "../hooks/useDeleteParticipant";

const EventDetails = memo(() => {
    const [isEditing, setIsEditing] = useState(false);
    const { eventId } = useEventDetailStore();
    const { deleteParticipant, isDeletingParticipant } = useDeleteParticipant();
    const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
    const {
        event,
        isLoading,
        updateEvent,
        isUpdating,
    } = useEventDetails(eventId || '');
    const { generatePDF, isGenerating } = useEventPDF({ event: event! });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<EventFormUpdateData>({
        resolver: zodResolver(EventFormUpdateSchema),
        defaultValues: event ? {
            name: event.name,
            startDate: formatDateTime(event.startDate),
            endDate: formatDateTime(event.endDate),
            status: event.status,
        } : undefined,
    });

    useEffect(() => {
        if (event) {
            reset({
                name: event.name,
                startDate: formatDateTime(event.startDate),
                endDate: formatDateTime(event.endDate),
                status: event.status,
            });
        }
    }, [event, reset]);

    if (!eventId) {
        return <h2>There is error</h2>;
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <RiLoader2Fill className="animate-spin text-4xl text-white" />
            </div>
        );
    }

    if (!event) {
        return (
            <div className="text-center text-white py-8">
                Event not found
            </div>
        );
    }

    const onSubmit = async (data: EventFormUpdateData) => {

        console.log(selectedParticipants)
        updateEvent({ ...data, participants: selectedParticipants }, {
            onSuccess: () => {
                setIsEditing(false);
                reset(data);
            },
        });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        if (event) {
            reset({
                name: event.name,
                startDate: formatDateTime(event.startDate),
                endDate: formatDateTime(event.endDate),
                status: event.status,
            });
        }
    };

    return (
        <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                    <Image
                        className="w-20 h-20 object-cover object-center rounded-full"
                        src={event.logo}
                        alt={event.name}
                        width={100}
                        height={100}
                    />
                    <div>
                        <h1 className="text-2xl font-bold text-white">{event.name}</h1>
                        <span className={`px-2 py-1 rounded-full text-xs ${event.status === "PUBLIC"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                            }`}>
                            {event.status}
                        </span>
                    </div>
                </div>
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <Button onClick={handleSubmit(onSubmit)} disabled={isUpdating}>
                                <div className="flex items-center gap-2">
                                    {isUpdating ? (
                                        <RiLoader2Fill className="animate-spin" />
                                    ) : (
                                        <RiSaveLine />
                                    )}
                                    {isUpdating ? "Saving..." : "Save"}
                                </div>
                            </Button>
                            <Button onClick={handleCancelEdit} type="button">
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button onClick={() => setIsEditing(true)} type="button">
                            <div className="flex items-center gap-2">
                                <RiEditLine />
                                Edit
                            </div>
                        </Button>
                    )}
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                    label="Event Name"
                    id="name"
                    register={register}
                    errors={errors}
                    disabled={!isEditing}
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Start Date"
                        id="startDate"
                        type="datetime-local"
                        register={register}
                        errors={errors}
                        disabled={!isEditing}
                    />
                    <Input
                        label="End Date"
                        id="endDate"
                        type="datetime-local"
                        register={register}
                        errors={errors}
                        disabled={!isEditing}
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <label className="text-white">Status:</label>
                    <select
                        {...register("status")}
                        disabled={!isEditing}
                        className="bg-gray-800 text-white rounded px-2 py-1"
                    >
                        <option value="PUBLIC">Public</option>
                        <option value="PRIVATE">Private</option>
                    </select>
                    {errors.status && (
                        <span className="text-red-500 text-sm">{errors.status.message}</span>
                    )}
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Participants ({event.participants.length})
                    </h2>
                    {isEditing && <ParticipantsSelector
                        participantIds={selectedParticipants}
                        onParticipantsChange={setSelectedParticipants}
                    />}
                    <div className="bg-gray-800 rounded-lg overflow-hidden overflow-x-auto ">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-700">
                                    <th className="px-4 py-2 text-left text-white">#</th>
                                    <th className="px-4 py-2 text-left text-white">Name</th>
                                    <th className="px-4 py-2 text-left text-white">Email</th>
                                    <th className="px-4 py-2 text-left text-white">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {event.participants.map((participant, index) => (
                                    <tr key={participant._id} className="border-t border-gray-700">
                                        <td className="px-4 py-2 text-gray-300">{index + 1}</td>
                                        <td className="px-4 py-2 text-white">{participant.name}</td>
                                        <td className="px-4 py-2 text-gray-300">{participant.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Button
                                                onClick={() => deleteParticipant(participant._id, event._id?.toString())}

                                                danger
                                                disabled={isDeletingParticipant}
                                            >
                                                <RiDeleteBin6Line className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>



                </div>

                <div className="flex justify-end mt-6">
                    <Button
                        onClick={() => generatePDF()}
                        disabled={isGenerating}
                        type="button"
                    >
                        {isGenerating ? (
                            <div className="flex items-center gap-2">
                                <RiLoader2Fill className="animate-spin" />
                                Generating PDF...
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
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
                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                Download Participants List
                            </div>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
});

EventDetails.displayName = "EventDetails";

export default EventDetails;