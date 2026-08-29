import type { Event } from "../Types";

const API_URL = 'http://localhost:8080/api/events';

export async function getEventsBetweenDates(
  date1: string,
  date2: string
): Promise<Event[]> {
  const response = await fetch(`${API_URL}/between?date1=${date1}&date2=${date2}`);

  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }

  return response.json();
}

export async function getEventsOnDate(
  date: string
): Promise<Event[]> {
  const response = await fetch(`${API_URL}?date=${date}`);

  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }

  return response.json();
}

export async function getEvent(
  id: number
): Promise<Event> {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch event');
  }

  return response.json();
}

export async function createEvent(
  event: Event
): Promise<Event> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    throw new Error('Failed to create event');
  }

  return response.json();
}

export async function updateEvent(
  id: number,
  event: Event
): Promise<Event> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    throw new Error('Failed to update event');
  }

  return response.json();
}

export async function deleteEvent(
  id: number
): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete event');
  }
}