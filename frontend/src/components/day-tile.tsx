import { getDate } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface DayTileProps {
  date: Date;
  muted?: Boolean;
}

export const DayTile = ({ date, muted = false }: DayTileProps) => {
  const navigate = useNavigate();

  const dateToISODate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  return (
    <div
      className={`w-[100px] h-[90px] bg-white rounded-xl font-[Inter] text-sm flex items-start justify-end pr-3 pt-2 ${
        muted ? 'text-gray-400' : 'text-black'
      }`}
      onClick={() => navigate(`/calendar/${dateToISODate(date)}`)}
    >
      <span className="leading-none">{getDate(date)}</span>
    </div>
  );
};
