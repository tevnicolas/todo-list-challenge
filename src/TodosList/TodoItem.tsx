import { Task } from '../data';

type TodoItemProps = {
  task: Task;
  index: number;
  toggleDone: (_index: number) => void;
};

export function TodoItem({ task, index, toggleDone }: TodoItemProps) {
  return (
    <li className="flex items-start w-full">
      <div className="m-2">
        <button
          type="button"
          aria-pressed={task.done}
          className={`h-[20px] w-[20px] p-0 rounded-full ${task.done ? 'bg-focuslightblue' : 'bg-focuslightgrey'}`}
          onClick={() => toggleDone(index)}
        />
      </div>
      <p
        className={`text-[20px] text-left font-kdam mt-[4.5px] ${task.done ? 'line-through text-focusgrey' : 'text-black'}`}
      >
        {task.content}
      </p>
    </li>
  );
}
