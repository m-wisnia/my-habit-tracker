import type { Event, CourseClass } from "../Types";

const API_URL = 'http://localhost:8080/api/calendarEvents';

export async function getCalendarEventsBetweenDates(
    date1: string,
    date2: string
): Promise<(Event|CourseClass)[]> {
    const response = await fetch(`${API_URL}/between?date1=${date1}&date2=${date2}`)

    if(!response.ok) {
        throw new Error('Failed to fetch calendar events');
    }

    return response.json();
}