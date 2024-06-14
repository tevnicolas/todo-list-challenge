import { useState, KeyboardEvent } from 'react';
import { Task } from './data';

type TodosFormProps = {
  addTask: (_task: Task) => void;
  tasks: Task[];
};

/**
 * Form component for adding new tasks to the todo list.
 * Includes an input field for task content and handles adding the task on pressing Enter.
 */
export function TodosForm({ addTask, tasks }: TodosFormProps) {
  const [value, setValue] = useState('');

  /**
   * Handles the Enter key event to add a new task.
   * Creates a new task with a unique ID and adds it to the task list.
   *
   * @param {KeyboardEvent<HTMLInputElement>} e - The keyboard event object.
   */
  function handleEnterKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter' || !value) return;
    e.preventDefault();
    const newId = tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
    const newTask: Task = { content: value, done: false, id: newId };
    addTask(newTask);
    setValue('');
  }

  return (
    <div className="flex justify-center w-[70%] h-14 mt-8 mb-3">
      <input
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
