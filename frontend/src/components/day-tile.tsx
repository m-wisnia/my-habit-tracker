import { getDate, isWeekend } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface DayTileProps {
  date: Date;
  muted?: Boolean;
}

export const dateToISODate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const DayTile = ({ date, muted = false }: DayTileProps) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[] | null>(null);

  return (
    <div
      className={`w-[100px] h-[90px] rounded-xl font-[Inter] text-sm flex items-start justify-end pr-3 pt-2 
        ${isWeekend(date) ? 'bg-[var(--frame-light-beige)]' : 'bg-white'}
        ${muted ? 'text-gray-400' : 'text-black'}
        ${dateToISODate(date) == dateToISODate(new Date()) ? 'outline-2 outline-[var(--bg-dark)]' : ''}`}
      onClick={() => navigate(`/calendar/${dateToISODate(date)}`)}
    >
      <span className="leading-none">{getDate(date)}</span>
    </div>
  );
};
