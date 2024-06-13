import { Task } from '../data';
import { TodoItem } from './TodoItem';

type TodosListProps = {
  visibleTasks: Task[];
  toggleDone: (_id: number) => void;
  deleteTask: (_id: number) => void;
};

export function TodosList({ toggleDone, deleteTask, visibleTasks }: TodosListProps) {
  return (
    <ul className="flex flex-wrap ml-[15%] mr-[20%] overflow-y-auto max-w-full max-h-[280px] break-words">
      {visibleTasks.map((task) => (
        <TodoItem key={task.id} toggleDone={toggleDone} deleteTask={deleteTask} task={task} />
      ))}
    </ul>
  );
}
