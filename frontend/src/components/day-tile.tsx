import {
  getDate,
  isWeekend,
  isToday,
  differenceInDays,
  startOfDay,
} from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Stage, CalendarItem } from '../Types';
import {
  dateToISODate,
  isEvent,
  isClass,
  isExam,
  isStageDeadline,
} from '@/utils';

interface DayTileProps {
  date: Date;
  allEvents: CalendarItem[];
  deadlines: Stage[];
  muted?: Boolean;
}

export const DayTile = ({
  date,
  allEvents,
  deadlines,
  muted = false,
}: DayTileProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [showDeadlines, setShowDeadlines] = useState(false);

  useEffect(() => {}, []);

  const getCalendarEventTime = (event: CalendarItem) => {
    if (isEvent(event)) {
      return `${event.dateStart}T${event.timeStart ?? '00:00'}`;
    } else if (isClass(event)) {
      return event.classStart;
    } else if (isStageDeadline(event)) {
      return event.deadline ? event.deadline : Infinity;
    } else if (isExam(event)) {
      return event.examStart;
    } else {
      return -1;
    }
  };

  const sortedEvents = [...allEvents].sort((a, b) => {
    const dateA = getCalendarEventTime(a);
    const dateB = getCalendarEventTime(b);

    return new Date(dateA).getTime() - new Date(dateB).getTime();
  });

  const shortName = (eventName: string) => {
    return eventName.length <= 7 || isHovered
      ? eventName
      : eventName.slice(0, 8) + '...';
  };

  return (
    <div
      className="w-[100px] h-[90px] group relative z-0 cursor-pointer hover:z-50"
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
        <div className="flex justify-between w-full mb-1">
          <span className="leading-none ml-1">{getDate(date)}</span>
          {deadlines.length != 0 && (
            <div className="relative inline-block">
              <span
                className="leading-none font-[Young_Serif] mr-2 text-[var(--project-light)] cursor-help"
                onMouseEnter={() => setShowDeadlines(true)}
                onMouseLeave={() => setShowDeadlines(false)}
              >
                !
              </span>
              {showDeadlines && (
                <div
                  className={`absolute left-0 bottom-full mb-2 rounded-lg bg-white p-3 shadow-lg border-2 border-[var(--project-light)] transition-all duration-200 ease-out
                  ${
                    showDeadlines
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-1 pointer-events-none'
                  }`}
                >
                  {deadlines.map((ddline) => {
                    if (ddline.deadline) {
                      const noDays = differenceInDays(
                        startOfDay(new Date(ddline.deadline)),
                        startOfDay(date),
                      );
                      return (
                        <span
                          key={ddline.stageId}
                          className="w-full text-[var(--project-dark)] px-2 my-1 flex whitespace-nowrap"
                        >
                          {ddline.name} in {noDays}{' '}
                          {noDays == 1 ? 'day' : 'days'}
                        </span>
                      );
                    }
                  })}
                </div>
              )}
            </div>
          )}
        </div>

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
                    <span>{shortName(event.name)}</span>
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
                    <span>{shortName(subjectName)}</span>
                  </div>
                );
              } else if (isStageDeadline(event)) {
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
                    <span>{shortName(event.name)}</span>
                  </div>
                );
              } else {
                return (
                  <div
                    key={`exam-${event.examId}`}
                    className="w-full text-[var(--class-dark)] font-[Young_Serif] text-xs text-left px-2 mb-1 whitespace-nowrap rounded-3xl"
                    style={{ backgroundColor: event.subject.color }}
                  >
                    {isHovered && (
                      <span className="mr-2 font-[PT_Sans]">
                        {event.examStart.slice(11, 16)}
                      </span>
                    )}
                    <span>
                      {shortName(
                        '! ' + event.subject.name + ' : ' + event.name,
                      )}
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
