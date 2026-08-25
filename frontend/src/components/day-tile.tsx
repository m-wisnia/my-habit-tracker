import { getDate } from 'date-fns';

interface DayTileProps {
  date: Date;
  muted?: Boolean;
}

export const DayTile = ({ date, muted = false }: DayTileProps) => {
  return (
    <div
      className={`w-[100px] h-[90px] bg-white rounded-xl font-[Inter] text-sm flex items-start justify-end pr-3 pt-2 ${
        muted ? 'text-gray-400' : 'text-black'
      }`}
    >
      <span className="leading-none">{getDate(date)}</span>
    </div>
  );
};
