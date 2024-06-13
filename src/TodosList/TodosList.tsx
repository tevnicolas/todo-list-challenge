import { Task } from '../data';
import { TodoItem } from './TodoItem';
import { DragEvent } from 'react';

type TodosListProps = {
  visibleTasks: Task[];
  toggleDone: (_id: number) => void;
  deleteTask: (_id: number) => void;
  handleDragStart: (_index: number) => void;
  handleDragOver: (_index: number, _e: DragEvent<HTMLLIElement>) => void;
  handleDrop: () => void;
};

export function TodosList({
  toggleDone,
  deleteTask,
  visibleTasks,
  handleDragStart,
  handleDragOver,
  handleDrop,
}: TodosListProps) {
  return (
    <ul className="flex flex-col items-start ml-[15%] mr-[20%] overflow-y-auto max-w-full h-full max-h-[280px] break-words">
      {visibleTasks.map((task, i) => (
        <TodoItem
          key={task.id}
          toggleDone={toggleDone}
          deleteTask={deleteTask}
          task={task}
          handleDragStart={() => handleDragStart(i)}
          handleDragOver={(e) => handleDragOver(i, e)}
          handleDrop={handleDrop}
        />
      ))}
      s
    </ul>
  );
}
