import { useState } from 'react';
import { Task } from '../data';
import { TodoItem } from './TodoItem';
import { VisbilityButton } from './VisibilityButton';

type TodosListProps = {
  tasks: Task[];
  toggleDone: (_id: number) => void;
  deleteTask: (_id: number) => void;
  clearCompleted: () => void;
};

export type VisibilityOption = 'all' | 'active' | 'complete';

export function TodosList({ tasks, toggleDone, deleteTask, clearCompleted }: TodosListProps) {
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
          <TodoItem key={task.id} toggleDone={toggleDone} deleteTask={deleteTask} task={task} />
        ))}
      </ul>
      <div className="flex justify-center">
        <div className="flex justify-start items-center w-full">
          <p className="text-focuslightblue ml-20 mt-1 text-[14px] font-medium font-inherit">{`${visibleTasks['active'].length} ${visibleTasks['active'].length > 1 ? 'tasks' : 'task'} left`}</p>
        </div>
        <VisbilityButton option="all" isSelected={visibilityOption} onClick={handleVisibilityClick} />
        <VisbilityButton option="active" isSelected={visibilityOption} onClick={handleVisibilityClick} />
        <VisbilityButton option="complete" isSelected={visibilityOption} onClick={handleVisibilityClick} />
        <div className="flex justify-end items-center w-full">
          <button
            className="text-focuslightblue hover:text-black mr-14 mt-1 text-[14px] font-medium font-inherit p-0 bg-focuswhite focus:outline-none border-none"
            onClick={clearCompleted}
          >
            clear completed
          </button>
        </div>
      </div>
    </div>
  );
}
