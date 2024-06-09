import React from 'react';
import ReactDOM from 'react-dom/client';
import { TodosApp } from './TodosApp.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TodosApp />
  </React.StrictMode>,
);
