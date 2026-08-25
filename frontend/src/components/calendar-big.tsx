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

  const decreaseMonth = () => {
    if (month != null && year) {
      if (month == 0) {
        setYear(year - 1);
      }
      setMonth(month > 0 ? month - 1 : 11);
    }
  };

  const increaseMonth = () => {
    if (month != null && year) {
      if (month == 11) {
        setYear(year + 1);
      }
      setMonth(month < 11 ? month + 1 : 0);
    }
  };

  return (
    <div className="w-[800px] h-[720px] bg-[var(--frame-beige)] m-[30px] rounded-2xl">
      <div className="relative flex w-full h-[65px] bg-[var(--frame-dark-beige)] rounded-t-2xl text-[var(--text-brown)] text-[30px] items-center justify-between px-60">
        <CircleArrowLeft onClick={() => decreaseMonth()} />
        <div className="absolute left-1/2 -translate-x-1/2">
          {month != null ? months[month] : ''} {year}
        </div>
        <CircleArrowRight onClick={() => increaseMonth()} />
      </div>
    </div>
  );
};
