import {
  getDate,
  isWeekend,
  isToday,
  differenceInDays,
  startOfDay,
} from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Event, CourseClass, Stage } from '../Types';
import { dateToISODate, isEvent, isClass } from '@/utils';

interface DayTileProps {
  date: Date;
  allEvents: (Event | CourseClass | Stage)[];
  muted?: Boolean;
}

export const DayTile = ({ date, allEvents, muted = false }: DayTileProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {}, []);

  const sortedEvents = [...allEvents].sort((a, b) => {
    const dateA = isEvent(a)
      ? `${a.dateStart}T${a.timeStart ?? '00:00'}`
      : isClass(a)
        ? a.classStart
        : a.deadline
          ? a.deadline
          : Infinity;

    const dateB = isEvent(b)
      ? `${b.dateStart}T${b.timeStart ?? '00:00'}`
      : isClass(b)
        ? b.classStart
        : b.deadline
          ? b.deadline
          : Infinity;

    return new Date(dateA).getTime() - new Date(dateB).getTime();
  });

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
          {(isHovered ? sortedEvents : sortedEvents.slice(0, 3)).map(
            (event) => {
              if (isEvent(event)) {
                return (
                  <div
                    key={`event-${event.eventId}`}
                    className={`w-full text-[var(--event-dark)] font-[Young_Serif] text-xs text-left px-2 mb-1 whitespace-nowrap flex
                ${event.fullday && event.dateStart != event.dateEnd ? (dateToISODate(date) == event.dateStart ? 'rounded-l-3xl' : dateToISODate(date) == event.dateEnd ? 'rounded-r-3xl' : '') : 'rounded-3xl'}`}
                    style={{ backgroundColor: event.color }}
                  >
                    {isHovered && (
                      <span className="mr-2 font-[PT_Sans]">
                        {event.fullday || event.timeStart == null
                          ? 'Day ' +
                            (differenceInDays(
                              startOfDay(date),
                              startOfDay(new Date(event.dateStart)),
                            ) +
                              1)
                          : event.timeStart.slice(0, 5)}
                      </span>
                    )}
                    <span>
                      {event.name.length <= 7 || isHovered
                        ? event.name
                        : event.name.slice(0, 8) + '...'}
                    </span>
                  </div>
                );
              } else if (isClass(event)) {
                const subjectName = event.course.subject.name;
                return (
                  <div
                    key={`class-${event.courseClassId}`}
                    className="w-full text-[var(--class-dark)] font-[Young_Serif] text-xs text-left px-2 mb-1 whitespace-nowrap rounded-3xl"
                    style={{ backgroundColor: event.course.subject.color }}
                  >
                    {isHovered && (
                      <span className="mr-2 font-[PT_Sans]">
                        {event.classStart.slice(11, 16)}
                      </span>
                    )}
                    <span>
                      {subjectName.length <= 7 || isHovered
                        ? subjectName
                        : subjectName.slice(0, 8) + '...'}
                    </span>
                  </div>
                );
              } else {
                return (
                  <div
                    key={`project-stage-${event.stageId}`}
                    className="w-full text-[var(--project-dark)] font-[Young_Serif] text-xs text-left px-2 mb-1 whitespace-nowrap rounded-3xl"
                    style={{ backgroundColor: event.project.color }}
                  >
                    {isHovered && event.deadline && (
                      <span className="mr-2 font-[PT_Sans]">
                        {event.deadline.slice(11, 16)}
                      </span>
                    )}
                    <span>
                      {event.name.length <= 7 || isHovered
                        ? event.name
                        : event.name.slice(0, 8) + '...'}
                    </span>
                  </div>
                );
              }
            },
          )}
        </div>
      </div>
    </div>
  );
};
