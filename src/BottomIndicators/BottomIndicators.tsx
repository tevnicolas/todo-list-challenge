import { Visibility } from '../data';
import { VisbilityButton } from './VisibilityButton';

type BottomIndicatorsProps = {
  tasksLeft: number;
  visibility: Visibility;
  handleVisibilityClick: (_visibility: Visibility) => void;
  clearCompleted: () => void;
};

export function BottomIndicators({
  tasksLeft,
  visibility,
  handleVisibilityClick,
  clearCompleted,
}: BottomIndicatorsProps) {
  return (
    <div className="flex justify-center pr-9 pt-[15px]">
      <div className="flex justify-start items-center w-full">
        <p className="text-focuslightblue ml-20 mt-1 pr-2 text-[14px] font-medium font-inherit min-w-[68px]">{`${tasksLeft} ${tasksLeft === 1 ? 'task' : 'tasks'} left`}</p>
      </div>
      <VisbilityButton option="all" selected={visibility} onClick={handleVisibilityClick} />
      <VisbilityButton option="active" selected={visibility} onClick={handleVisibilityClick} />
      <VisbilityButton option="complete" selected={visibility} onClick={handleVisibilityClick} />
      <div className="flex justify-end items-center w-full">
        <button
          className="text-focuslightblue hover:text-black mr-14 mt-1 pl-2 text-[14px] font-medium font-inherit p-0 bg-focuswhite focus:outline-none border-none"
          onClick={clearCompleted}
        >
          clear completed
        </button>
      </div>
    </div>
  );
}
