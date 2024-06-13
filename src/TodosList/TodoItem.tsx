import { useState } from 'react';
import { Task } from '../data';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';

type TodoItemProps = {
  task: Task;
  toggleDone: (_id: number) => void;
  deleteTask: (_id: number) => void;
};

export function TodoItem({ task, toggleDone, deleteTask }: TodoItemProps) {
  const [isFading, setIsFading] = useState(false);

  function handleDeleteWithFade() {
    setIsFading(true);
    setTimeout(() => {
      deleteTask(task.id);
    }, 400); // Duration of the fade-out animation
  }

  return (
    <li
      className={`flex items-start w-full max-w-full hover:bg-focuslightgrey group opacity-0 animate-fadeIn ${isFading && 'animate-fadeOut'}`}
    >
      <div className="m-2 pb-[5px]">
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
        className={`text-[20px] text-left font-kdam mt-[4.5px] max-w-[346px] break-words ${task.done ? 'line-through text-focusgrey' : 'text-black'}`}
      >
        {task.content}
      </p>
      <div className="flex items-center justify-end h-full w-full mr-2">
        <FaRegTrashAlt onClick={handleDeleteWithFade} className="group-hover:fill-[rgb(139,139,139)]" />
      </div>
    </li>
  );
}
