import { Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MenuBar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[58px] bg-[var(--bg-dark)] content-center">
      <div className="flex gap-[15px] px-[30px] items-center h-full">
        <div
          className="cursor-pointer h-[36px] w-[36px] bg-white rounded-full flex items-center justify-center shrink-0"
          onClick={() => navigate('/home')}
        >
          <Leaf className="h-[34px] w-[34px] text-[var(--bg-dark)]" />
        </div>

        <div
          className="cursor-pointer hidden min-[930px]:block font-[Langar] text-4xl text-white"
          onClick={() => navigate('/home')}
        >
          My Habit Tracker
        </div>

        <div className="ml-auto flex gap-[15px] self-end">
          <button
            className="top-button bg-[var(--event-dark)] hover:-translate-y-[3px] hover:scale-110"
            onClick={() => navigate('/events')}
          >
            Events
          </button>
          <button
            className="top-button bg-[var(--class-dark)] hover:-translate-y-[3px] hover:scale-110"
            onClick={() => navigate('/classes')}
          >
            Classes
          </button>
          <button
            className="top-button bg-[var(--habit-dark)] hover:-translate-y-[3px] hover:scale-110"
            onClick={() => navigate('/habits')}
          >
            Habits
          </button>
          <button
            className="top-button bg-[var(--project-dark)] hover:-translate-y-[3px] hover:scale-110"
            onClick={() => navigate('/projects')}
          >
            Projects
          </button>
          <button
            className="top-button bg-[var(--health-dark)] hover:-translate-y-[3px] hover:scale-110"
            onClick={() => navigate('/health')}
          >
            Health
          </button>
        </div>
      </div>
    </div>
  );
};
