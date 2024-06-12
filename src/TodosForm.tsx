import { useState, KeyboardEvent } from 'react';
import { Task } from './data';

type TodosFormProps = {
  addTask: (_task: Task) => void;
  tasks: Task[];
};

export function TodosForm({ addTask, tasks }: TodosFormProps) {
  const [value, setValue] = useState('');

  function handleEnterKey(e: KeyboardEvent<HTMLInputElement>) {
    const newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const newTask: Task = { content: value, done: false, id: newId };
    addTask(newTask);
    setValue('');
  }

  return (
    <div className="flex justify-center w-[70%] h-14 mt-8 mb-5">
      <input
        required
        type="text"
        name="newTodo"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder="What needs to be done?"
        onKeyDown={handleEnterKey}
        className="bg-focuslightgrey w-full rounded-[20px] p-4 text-black font-kdam text-[20px] placeholder:text-focusgrey"
      />
    </div>
  );
}
