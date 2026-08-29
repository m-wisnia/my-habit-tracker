export interface Category {
  categoryId: number;
  name: string;
  color: string;
}

export interface Event {
  eventId: number;
  color: string;
  name: string;
  address: string | null;
  fullday: boolean;
  dateStart: string;
  timeStart: string | null;
  dateEnd: string;
  timeEnd: string | null;
  notes: string | null;
  category: Category;
}