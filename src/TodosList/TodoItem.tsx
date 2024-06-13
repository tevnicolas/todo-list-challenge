import { useState, DragEvent } from 'react';
import { Task } from '../data';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';

type TodoItemProps = {
  task: Task;
  toggleDone: (_id: number) => void;
  deleteTask: (_id: number) => void;
  handleDragStart: () => void;
  handleDragOver: (_e: DragEvent<HTMLLIElement>) => void;
  handleDrop: () => void;
};

export function TodoItem({ task, toggleDone, deleteTask, handleDragStart, handleDragOver, handleDrop }: TodoItemProps) {
  const [isFading, setIsFading] = useState(false);

  function handleDeleteWithFade() {
    setIsFading(true);
    setTimeout(() => {
      deleteTask(task.id);
    }, 400);
  }

  return (
    <li
      className={`flex items-center w-full max-w-full hover:bg-focuslightgrey group opacity-0 animate-fadeIn ${isFading && 'animate-fadeOut'}`}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex item-start mt-[6px] mb-[6px] w-full">
        <div className="m-2">
          <button
            type="button"
            aria-pressed={task.done}
            className={`flex justify-center items-center h-[20px] w-[20px] p-0 rounded-full focus:outline-none hover:border-focuslightblue ${task.done ? 'bg-focuslightblue' : 'bg-focuslightgrey'}`}
            onClick={() => toggleDone(task.id)}
          >
            <FaCheck className={`w-[10px] ${task.done ? 'fill-focuswhite' : 'fill-focuslightgrey'}`} />
          </button>
        </div>
        <p
          className={`text-[20px] text-left font-kdam w-full max-w-[310px] pt-[1px] pl-1 mt-[2px] mb-[2px] break-words ${task.done ? 'line-through text-focusgrey' : 'text-black'}`}
        >
          {task.content}
        </p>
      </div>
      <div className="flex items-center justify-end h-full w-auto min-w-6 mr-4">
        <FaRegTrashAlt onClick={handleDeleteWithFade} className="group-hover:fill-[rgb(139,139,139)]" />
      </div>
    </li>
  );
}
