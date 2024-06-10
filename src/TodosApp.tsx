import { useEffect, useState } from 'react';
import './TodosApp.css';
import { TodosForm } from './TodosForm';
import { TodosList } from './TodosList/TodosList';
import { Task, readTasks } from './data';

export function TodosApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks(): Promise<void> {
      try {
        const fetched = await readTasks();
        setTasks(fetched);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTasks();
  }, []);

  function addTask(task: Task): void {
    setTasks((prevTasks) => [task, ...prevTasks]);
  }

  function toggleDone(index: number): void {
    setTasks((prevTasks) => prevTasks.map((task, i) => (i === index ? { ...task, done: !task.done } : task)));
  }

  return (
    <div className="flex flex-wrap justify-center items-start w-[70vw] max-w-[800px] min-w-[420px] h-[700px] bg-papayawhip">
      <div className="w-full">
        <h1 className="font-kanit text-black">todo list</h1>
        <h3 className="font-kanit text-black">by Tev Nicolas</h3>
      </div>
      <div className="flex flex-col flex-wrap justify-start items-center h-[500px] min-w-[420px] max-w-[620px] w-full rounded-[80px] bg-focuswhite border-focusblue border-[16px]">
        <TodosForm addTask={addTask} />
        {error ? (
          <div>
            <p>{`Error: ${error}. Try reloading the page.`}</p>
          </div>
        ) : isLoading ? (
          <div>
            <p>Loading</p>
          </div>
        ) : (
          <TodosList tasks={tasks} toggleDone={toggleDone} />
        )}
      </div>
    </div>
  );
}
