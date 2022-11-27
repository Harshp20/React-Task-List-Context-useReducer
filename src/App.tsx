import React from 'react'
import './styles/App.css';
import { ToDoComponent as ToDoContextProvider } from './contexts/ToDoContext'
import ToDoList from './components/ToDoList'

function App() {
  return (
    <ToDoContextProvider>
      <ToDoList />
    </ToDoContextProvider>
  );
}

export default App;
