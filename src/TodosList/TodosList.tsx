import { Task } from '../data';
import { TodoItem } from './TodoItem';

type TodosListProps = {
  tasks: Task[];
  toggleDone: (_index: number) => void;
};

export function TodosList({ tasks, toggleDone }: TodosListProps) {
  return (
    <ul className="flex flex-wrap ml-[15%] mr-[20%] overflow-y-auto max-w-full max-h-[280px]">
      {tasks.map((task, index) => (
        <TodoItem key={index} index={index} toggleDone={toggleDone} task={task} />
      ))}
    </ul>
  );
}
