
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
    __v: number;
}


export type Events = Event[];


export interface EventsApiResponse {
    data: Events;

}