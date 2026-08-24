import { useEffect, useState } from 'react';
import { getMonth, getYear } from 'date-fns';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';

export const CalendarBig = () => {
  const [month, setMonth] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);
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

  useEffect(() => {
    const today: Date = new Date();
    setMonth(getMonth(today));
    setYear(getYear(today));
  }, []);

  return (
    <div className="w-[800px] h-[720px] bg-[var(--frame-beige)] m-[30px] rounded-2xl">
      <div className="flex w-full h-[65px] bg-[var(--frame-dark-beige)] rounded-t-2xl text-[var(--text-brown)] text-[30px] items-center">
        <div className="flex relative left-1/2 -translate-x-1/2 items-center gap-[20px]">
          <CircleArrowLeft
            onClick={() => {
              if (month == 0) {
                setYear(year - 1);
              }
              setMonth(month > 0 ? month - 1 : 11);
            }}
          />
          {month != null ? months[month] : ''} {year}
          <CircleArrowRight
            onClick={() => {
              if (month == 11) {
                setYear(year + 1);
              }
              setMonth(month < 11 ? month + 1 : 0);
            }}
          />
        </div>
      </div>
    </div>
  );
};
