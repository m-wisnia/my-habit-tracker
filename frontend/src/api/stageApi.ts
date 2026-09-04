import type { Stage } from "../Types";

const API_URL = 'http://localhost:8080/api/stages';

export async function getStagesBetweenDates(
  date1: string,
  date2: string
): Promise<Stage[]> {
  const response = await fetch(`${API_URL}/between?date1=${date1}&date2=${date2}`);

  if (!response.ok) {
    throw new Error('Failed to fetch stages');
  }

  return response.json();
}

export async function getStagesOnDate(
  date: string
): Promise<Stage[]> {
  const response = await fetch(`${API_URL}?date=${date}`);

  if (!response.ok) {
    throw new Error('Failed to fetch stage');
  }

  return response.json();
}

export async function getStage(
  id: number
): Promise<Stage> {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch stage');
  }

  return response.json();
}

export async function createEvent(
  stage: Stage
): Promise<Stage> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(stage),
  });

  if (!response.ok) {
    throw new Error('Failed to create stage');
  }

  return response.json();
}

export async function updateStage(
  id: number,
  stage: Stage
): Promise<Stage> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(stage),
  });

  if (!response.ok) {
    throw new Error('Failed to update stage');
  }

  return response.json();
}

export async function deleteStage(
  id: number
): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete stage');
  }
}