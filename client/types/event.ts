
import { z } from "zod";



// schema for create event wmit partcipant
export interface Participant {
    name: string;
    email: string;
}


export const EventFormCreateSchema = z.object({
    name: z.string().min(1, "Event name is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    status: z.enum(["PUBLIC", "PRIVATE"]),
    participantIds: z.array(z.string()).min(1, "At least one participant is required"),
});



export type EventFormCreateData = z.infer<typeof EventFormCreateSchema>;



// schema for update event
export const EventFormUpdateSchema = z.object({
    name: z.string().min(1, "Event name is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    status: z.enum(["PUBLIC", "PRIVATE"]),
});

export type EventFormUpdateData = z.infer<typeof EventFormUpdateSchema>;




// types
export enum EventStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}

// this type for participant
export interface Participant {
    name: string;
    email: string;
}


export interface Event {
    _id: string;
    name: string;
    logo: string;
    status: EventStatus;
    startDate: string,
    endDate: string,
    participants: Participant[];
    createdAt: string;
    updatedAt: string;

}


export type Events = Event[];


export interface EventsApiResponse {
    data: Events;

}