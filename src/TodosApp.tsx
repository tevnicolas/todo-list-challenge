import { useEffect, useState, DragEvent, KeyboardEvent } from 'react';
import './TodosApp.css';
import { TodosForm } from './TodosForm';
import { TodosList } from './TodosList/TodosList';
import { Task, Visibility } from './data';
import { BottomIndicators } from './BottomIndicators/BottomIndicators';
// (1) uncomment line below to load from exampleJSON object
// import { readExampleJSON } from './data';

export function TodosApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(true);
  const [visibility, setVisibility] = useState<Visibility>('all');
  const [draggingIndex, setDraggingIndex] = useState<number | undefined>();

  const visibilityOptions = {
    all: tasks,
    active: tasks.filter((task) => task.done === false),
    complete: tasks.filter((task) => task.done === true),
  };

  useEffect(() => {
    async function loadTasks(): Promise<void> {
      try {
        // (2) uncomment two lines below to load from exampleJSON object
        // const exampleJSONTasks = await readExampleJSON();
        // setTasks(exampleJSONTasks);

        // (3) comment out two lines below to load from exampleJSON object
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
      const newTasks = prevTasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
    });
  }

  function deleteTask(id: number): void {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.filter((task) => task.id !== id);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
    });
  }

  function clearCompleted(): void {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.filter((task) => task.done !== true);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
    });
  }

  function handleDragOver(index: number, e: DragEvent<HTMLLIElement>) {
    e.preventDefault();
    if (draggingIndex === index || draggingIndex === undefined) return;
    const newTasks = [...tasks];
    const [draggedTask] = newTasks.splice(draggingIndex, 1);
    newTasks.splice(index, 0, draggedTask);
    setDraggingIndex(index);
    setTasks(newTasks);
  }

  function handleDrop() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setDraggingIndex(undefined);
  }

  function handleKeyUpDownX(id: number, index: number, e: KeyboardEvent<HTMLDivElement>) {
    const newTasks = [...tasks];
    if (e.key === 'ArrowUp' && index) {
      e.preventDefault();
      const [selectedTask] = newTasks.splice(index, 1);
      newTasks.splice(index - 1, 0, selectedTask);
      setDraggingIndex(index - 1);
    } else if (e.key === 'ArrowDown' && index < tasks.length - 1) {
      e.preventDefault();
      const [selectedTask] = newTasks.splice(index, 1);
      newTasks.splice(index + 1, 0, selectedTask);
      setDraggingIndex(index + 1);
    } else if (e.key === 'x') {
      e.preventDefault();
      console.log(`Key pressed: ${e.key}`);
      console.log('id: ', id);
      toggleDone(id);
    }
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setDraggingIndex(undefined);
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
            <TodosList
              visibleTasks={visibilityOptions[visibility]}
              toggleDone={toggleDone}
              deleteTask={deleteTask}
              handleDragStart={setDraggingIndex}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleKeyDown={handleKeyUpDownX}
            />
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
