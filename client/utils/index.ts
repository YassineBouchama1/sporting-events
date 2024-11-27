
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO } from 'date-fns';

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}




export const formatDateTime = (date: string) => {
    try {
        return format(parseISO(date), "yyyy-MM-dd'T'HH:mm");
    } catch (error) {
        console.error('Error formatting date:', error);
        return date;
    }
};

export const formatDisplayDateTime = (date: string) => {
    try {
        return format(parseISO(date), 'PPP p');
    } catch (error) {
        console.error('Error formatting display date:', error);
        return date;
    }
};