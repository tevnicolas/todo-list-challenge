import { useState, KeyboardEvent } from 'react';
import { Task } from './data';

type TodosFormProps = {
  addTask: (_task: Task) => void;
};

export function TodosForm({ addTask }: TodosFormProps) {
  const [value, setValue] = useState('');

  function handleEnterKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const newTask: Task = { content: value, done: false };
    addTask(newTask);
    setValue('');
  }

  return (
    <div className="flex justify-center w-[70%] h-14 m-8">
      <input
        required
        type="text"
        name="newTodo"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder="What needs to be done?"
        onKeyDown={handleEnterKey}
        className="bg-focuslightgrey w-full rounded-[20px] p-4 text-black font-kdam placeholder:text-focusgrey"
      />
    </div>
  );
}
