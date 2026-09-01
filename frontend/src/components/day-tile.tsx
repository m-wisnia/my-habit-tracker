import { getDate, isWeekend, isToday } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Event } from '../Types';

interface DayTileProps {
  date: Date;
  events: Event[];
  muted?: Boolean;
}

export const dateToISODate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const DayTile = ({ date, events, muted = false }: DayTileProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {}, []);

  return (
    <div
      className="w-[100px] h-[90px] group relative z-0 hover:z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute top-0 left-0 z-50 min-w-[100px] min-h-[90px] rounded-xl font-[Inter] text-sm flex flex-col px-1 pt-2 group-hover:shadow-lg
        ${isWeekend(date) ? 'bg-[var(--frame-light-beige)]' : 'bg-white'}
        ${muted ? 'text-gray-400' : 'text-black'}
        ${isToday(date) ? 'outline-2 outline-[var(--bg-dark)]' : ''}`}
        onClick={() => navigate(`/calendar/${dateToISODate(date)}`)}
      >
        <span className="w-full leading-none text-right pr-2 mb-1">
          {getDate(date)}
        </span>
        <div>
          {(isHovered ? events : events.slice(0, 3)).map((event) => (
            <div
              key={event.eventId}
              className="w-full rounded-3xl text-[var(--event-dark)] font-[Young_Serif] text-xs text-left px-2 mb-1 whitespace-nowrap"
              style={{ backgroundColor: event.color }}
            >
              {event.name.length <= 9 || isHovered
                ? event.name
                : event.name.slice(0, 10) + '...'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
