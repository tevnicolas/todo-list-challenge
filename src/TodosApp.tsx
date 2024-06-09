import './TodosApp.css';
import { TodosForm } from './TodosForm';
import { TodosList } from './TodosList/TodosList';

export function TodosApp() {
  return (
    <div className="flex justify-center items-center w-[70vw] min-w-[400px] h-[500px] bg-papayawhip">
      <div className="flex justify-center h-[400px] min-w-[400px] max-w-[600px] w-full rounded-[40px] bg-focuswhite">
        <TodosForm />
        <TodosList />
      </div>
    </div>
  );
}
