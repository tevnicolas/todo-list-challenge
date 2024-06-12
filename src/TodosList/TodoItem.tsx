import { Task } from '../data';
import { FaRegTrashAlt } from 'react-icons/fa';

type TodoItemProps = {
  task: Task;
  toggleDone: (_id: number) => void;
  deleteTask: (_id: number) => void;
};

export function TodoItem({ task, toggleDone, deleteTask }: TodoItemProps) {
  return (
    <li className="flex items-start w-full max-w-full hover:bg-focuslightgrey group">
      <div className="m-2">
        <button
          type="button"
          aria-pressed={task.done}
          className={`h-[20px] w-[20px] p-0 rounded-full ${task.done ? 'bg-focuslightblue' : 'bg-focuslightgrey'}`}
          onClick={() => toggleDone(task.id)}
        />
      </div>
      <p
        className={`text-[20px] text-left font-kdam mt-[4.5px] max-w-[346px] break-words ${task.done ? 'line-through text-focusgrey' : 'text-black'}`}
      >
        {task.content}
      </p>
      <div className="flex items-center justify-end h-full w-full mr-2">
        <FaRegTrashAlt
          onClick={() => {
            console.log('Trash icon clicked for task id:', task.id);
            deleteTask(task.id);
          }}
          className="group-hover:fill-[rgb(139,139,139)]"
        />
      </div>
    </li>
  );
}
