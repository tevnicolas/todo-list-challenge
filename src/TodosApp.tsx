import { useEffect, useState } from 'react';
import './TodosApp.css';
import { TodosForm } from './TodosForm';
import { TodosList } from './TodosList/TodosList';
import { Task, Visibility } from './data';
import { BottomIndicators } from './BottomIndicators/BottomIndicators';
// import { readExampleJSON } from './data';

export function TodosApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(true);
  const [visibility, setVisibility] = useState<Visibility>('all');

  const visibilityOptions = {
    all: tasks,
    active: tasks.filter((task) => task.done === false),
    complete: tasks.filter((task) => task.done === true),
  };

  useEffect(() => {
    async function loadTasks(): Promise<void> {
      try {
        // uncomment two lines below to load from exampleJSON in data
        // const exampleTasks = await readExampleJSON();
        // setTasks(exampleTasks);

        // comment out two lines below to load from exampleJSON
        const localData = localStorage.getItem('tasks');
        setTasks(localData ? JSON.parse(localData) : []);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    loadTasks();
  }, []);

  function addTask(task: Task): void {
    setTasks((prevTasks) => {
      const updatedTasks = [task, ...prevTasks];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  }

  function toggleDone(id: number): void {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  }

  function deleteTask(id: number): void {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== id);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  }

  function clearCompleted(): void {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.done !== true);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  }

  return (
    <div className="flex flex-wrap justify-center items-start w-[70vw] max-w-[800px] min-w-[420px] h-[700px] bg-papayawhip opacity-0 animate-fadeIn">
      <div className="w-full opacity-0 animate-fadeIn2">
        <h1 className="font-kanit text-black">todo list</h1>
        <h3 className="font-kanit text-black">by Tev Nicolas</h3>
      </div>
      <div className="flex flex-col flex-wrap justify-start items-center h-[500px] min-w-[420px] max-w-[620px] w-full rounded-[80px] bg-focuswhite border-focusblue border-[16px]">
        <TodosForm addTask={addTask} tasks={tasks} />
        <div className="flex flex-col h-[340px] justify-between w-full">
          {error ? (
            <div className="flex justify-center items-end h-[35%]">
              <p className="text-red-600 animate-bounce">{`Error: ${error} Try reloading the page.`}</p>
            </div>
          ) : isLoading ? (
            <div className="flex justify-center items-end h-[35%]">
              <div className="flex w-14 justify-start">
                <p className="text-black animate-ellipsis after:content-[''] after:inline after:animate-ellipsis">
                  Loading
                </p>
              </div>
            </div>
          ) : (
            <TodosList visibleTasks={visibilityOptions[visibility]} toggleDone={toggleDone} deleteTask={deleteTask} />
          )}
          <BottomIndicators
            tasksLeft={visibilityOptions['active'].length}
            visibility={visibility}
            handleVisibilityClick={setVisibility}
            clearCompleted={clearCompleted}
          />
        </div>
      </div>
    </div>
  );
}
