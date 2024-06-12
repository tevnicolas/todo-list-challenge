import { useState } from 'react';
import { Task } from '../data';
import { TodoItem } from './TodoItem';
import { VisbilityButton } from './VisibilityButton';

type TodosListProps = {
  tasks: Task[];
  toggleDone: (_index: number) => void;
};

export type VisibilityOption = 'all' | 'active' | 'complete';

export function TodosList({ tasks, toggleDone }: TodosListProps) {
  const visibleTasks = {
    all: tasks,
    active: tasks.filter((task) => task.done === false),
    complete: tasks.filter((task) => task.done === true),
  };
  const [visibilityOption, setVisibilityOption] = useState<VisibilityOption>('all');
  function handleVisibilityClick(option: VisibilityOption) {
    setVisibilityOption(option);
  }

  return (
    <div className="flex flex-col h-[340px] justify-between w-full">
      <ul className="flex flex-wrap ml-[15%] mr-[20%] overflow-y-auto max-w-full max-h-[280px] break-words">
        {visibleTasks[visibilityOption].map((task) => (
          <TodoItem key={task.id} toggleDone={toggleDone} task={task} />
        ))}
      </ul>
      <div className="flex justify-center">
        <VisbilityButton option="all" isSelected={visibilityOption} onClick={handleVisibilityClick} />
        <VisbilityButton option="active" isSelected={visibilityOption} onClick={handleVisibilityClick} />
        <VisbilityButton option="complete" isSelected={visibilityOption} onClick={handleVisibilityClick} />
      </div>
    </div>
  );
}
