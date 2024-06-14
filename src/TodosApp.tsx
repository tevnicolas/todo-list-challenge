import { useEffect, useState, DragEvent, KeyboardEvent } from 'react';
import './TodosApp.css';
import { TodosForm } from './TodosForm';
import { TodosList } from './TodosList/TodosList';
import { Task, Visibility } from './data';
import { BottomIndicators } from './BottomIndicators/BottomIndicators';
// 3 steps to load from exampleJSON ->
// (1) uncomment line below to load from exampleJSON object, then look in the useEffect
// import { readExampleJSON } from './data';

/**
 * The main application component for managing and displaying tasks.
 * Handles task addition, deletion, completion toggling, reordering,
 * And filtering based on the visibility specified.
 */
export function TodosApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(true);
  const [visibility, setVisibility] = useState<Visibility>('all');
  const [activeIndex, setActiveIndex] = useState<number | undefined>();

  const visibilityOptions = {
    all: tasks,
    active: tasks.filter((task) => task.done === false),
    complete: tasks.filter((task) => task.done === true),
  };

  /**
   * useEffect hook to load tasks from local storage or example JSON on component mount.
   * Sets the tasks state and handles loading and error states.
   */
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

  /**
   * Adds a new task to the task list and updates local storage.
   *
   * @param {Task} task - The new task to be added.
   */
  function addTask(task: Task): void {
    setTasks((prevTasks) => {
      const updatedTasks = [task, ...prevTasks];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  }

  /**
   * Toggles the completion status of a task.
   *
   * @param {number} id - The ID of the task to be toggled.
   */
  function toggleDone(id: number): void {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
    });
  }

  /**
   * Deletes a task from the task list and updates local storage.
   *
   * @param {number} id - The ID of the task to be deleted.
   */
  function deleteTask(id: number): void {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.filter((task) => task.id !== id);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
    });
  }

  /**
   * Clears all completed tasks from the task list and updates local storage.
   */
  function clearCompleted(): void {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.filter((task) => task.done !== true);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
    });
  }

  /**
   * Handles the drag over event for a task.
   * Moves the dragged task to the new index and updates the task list.
   *
   * @param {number} index - The index where the task is being dragged over.
   * @param {DragEvent<HTMLLIElement>} e - The drag event object.
   */
  function handleDragOver(index: number, e: DragEvent<HTMLLIElement>) {
    e.preventDefault();
    if (activeIndex === index || activeIndex === undefined) return;
    const newTasks = [...tasks];
    const [draggedTask] = newTasks.splice(activeIndex, 1);
    newTasks.splice(index, 0, draggedTask);
    setActiveIndex(index);
    setTasks(newTasks);
  }

  /**
   * Handles the drop event for a task.
   * Updates local storage with the new task list order.
   */
  function handleDrop() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setActiveIndex(undefined);
  }

  /**
   * Handles key down events for task list items.
   * Moves tasks up or down in the list (ArrowUp / ArrowDown)
   * Or toggles task completion based with x key pressed.
   *
   * @param {number} id - The ID of the task.
   * @param {number} index - The current index of the task in the list.
   * @param {KeyboardEvent<HTMLDivElement>} e - The keyboard event object.
   */
  function handleKeyDown(id: number, index: number, e: KeyboardEvent<HTMLDivElement>): void {
    /**
     * Moves a task within the list by a specified amount.
     *
     * @param {number} index - The current index of the task.
     * @param {number} amount - The amount to move the task by.
     */
    function moveTask(index: number, amount: number): void {
      const newTasks = [...tasks];
      const [selectedTask] = newTasks.splice(index, 1);
      newTasks.splice(index + amount, 0, selectedTask);
      setActiveIndex(index + amount);
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    }
    if (e.key === 'ArrowUp' && index > 0) {
      e.preventDefault();
      moveTask(index, -1);
    } else if (e.key === 'ArrowDown' && index < tasks.length - 1) {
      e.preventDefault();
      moveTask(index, 1);
    } else if (e.key === 'x') {
      e.preventDefault();
      toggleDone(id);
    }
  }

  return (
    <div className="flex flex-wrap justify-center items-start w-[70vw] max-w-[800px] min-w-[420px] h-[700px] bg-papayawhip opacity-0 animate-fadeIn">
      {/* Header Section */}
      <div className="w-full opacity-0 animate-fadeIn2">
        <h1 className="font-kanit text-black">todo list</h1>
        <h3 className="font-kanit text-black">by Tev Nicolas</h3>
      </div>
      {/* Main Content Section */}
      <div className="flex flex-col flex-wrap justify-start items-center h-[500px] min-w-[420px] max-w-[620px] w-full rounded-[80px] bg-focuswhite border-focusblue border-[16px]">
        <TodosForm addTask={addTask} tasks={tasks} />
        <div className="flex flex-col h-[345px] justify-between w-full">
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
              handleDragStart={setActiveIndex}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleKeyDown={handleKeyDown}
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
