import { useEffect, useState } from 'react';
import { getDaysInMonth, getMonth, getYear, getDay, addDays } from 'date-fns';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';
import { DayTile } from './day-tile';

export const CalendarBig = () => {
  const [month, setMonth] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [extraBefore, setExtraBefore] = useState<Date[]>([]);
  const [extraAfter, setExtraAfter] = useState<Date[]>([]);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const handleToday = () => {
    const today: Date = new Date();
    const currentMonth = getMonth(today);
    const currentYear = getYear(today);
    setMonth(getMonth(today));
    setYear(getYear(today));
    fillDays(currentYear, currentMonth);
  };

  useEffect(() => {
    handleToday();
  }, []);

  const decreaseMonth = () => {
    if (month != null && year) {
      var newYear = year;
      var newMonth = month;
      if (month == 0) {
        newYear--;
      }
      newMonth = month > 0 ? month - 1 : 11;
      setMonth(newMonth);
      setYear(newYear);
      fillDays(newYear, newMonth);
    }
  };

  const increaseMonth = () => {
    if (month != null && year) {
      var newYear = year;
      var newMonth = month;
      if (month == 11) {
        newYear++;
      }
      newMonth = month < 11 ? month + 1 : 0;
      setMonth(newMonth);
      setYear(newYear);
      fillDays(newYear, newMonth);
    }
  };

  const fillDays = (targetYear: number, targetMonth: number) => {
    const firstDay = new Date(targetYear, targetMonth, 1);
    const daysInMonth = getDaysInMonth(firstDay);

    const daysBefore = (getDay(firstDay) + 6) % 7;
    const previousDays: Date[] = [];

    for (let i = daysBefore; i > 0; i--) {
      previousDays.push(addDays(firstDay, -i));
    }

    const nextDays: Date[] = [];

    const totalDays = daysBefore + daysInMonth;
    const cellsNeeded = 6 * 7;
    const daysAfter = cellsNeeded - totalDays;

    const lastDay = new Date(targetYear, targetMonth, daysInMonth);

    for (let i = 1; i <= daysAfter; i++) {
      nextDays.push(addDays(lastDay, i));
    }

    setExtraBefore(previousDays);
    setExtraAfter(nextDays);
  };

  return (
    <div className="w-[800px] h-[720px] bg-[var(--frame-beige)] m-[30px] rounded-2xl flex flex-col items-center justify-between">
      <div className="relative flex w-full h-[65px] bg-[var(--frame-dark-beige)] rounded-t-2xl text-[var(--text-brown)] text-[30px] items-center justify-between px-5">
        <button className="cursor-pointer w-[150px] h-[30px] bg-[var(--frame-light-beige)] rounded-3xl text-base content-center hover:scale-105">
          Months & Years
        </button>
        <button
          className="cursor-pointer absolute left-2/7 -translate-x-2/7"
          onClick={() => decreaseMonth()}
        >
          <CircleArrowLeft />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2">
          {month != null ? months[month] : ''} {year}
        </div>
        <button
          className="cursor-pointer absolute right-2/7 translate-x-2/7"
          onClick={() => increaseMonth()}
        >
          <CircleArrowRight />
        </button>
        <button
          className="cursor-pointer w-[85px] h-[30px] bg-[var(--frame-light-beige)] rounded-3xl text-base content-center hover:scale-105"
          onClick={() => handleToday()}
        >
          Today
        </button>
      </div>

      <div className="grid text-[var(--text-brown)] text-xs grid-cols-7 w-full px-4 pt-1">
        {weekdays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-[10px] m-5 mt-1">
        {extraBefore?.map((date) => (
          <DayTile key={date.toISOString()} date={date} muted={true} />
        ))}

        {month != null && year
          ? Array.from(
              { length: getDaysInMonth(new Date(year, month, 1)) },
              (_, index) => (
                <DayTile key={index} date={new Date(year, month, index + 1)} />
              ),
            )
          : ''}

        {extraAfter?.map((date) => (
          <DayTile key={date.toISOString()} date={date} muted={true} />
        ))}
      </div>
    </div>
  );
};
