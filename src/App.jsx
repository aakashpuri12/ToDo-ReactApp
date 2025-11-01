import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn ReactJS basics', done: true },
    { id: 2, text: 'Practice ReactJS', done: false },
    { id: 3, text: 'Learn Redux', done: false },
    { id: 4, text: 'Code portfolio in React', done: false },
    { id: 5, text: 'Learn React Native', done: false }
  ]);

  const [filter, setFilter] = useState('All');
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: newTodo, done: false }]);
    setNewTodo('');
  };

  const toggleDone = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id) => {
    const newText = prompt('Edit task:');
    if (newText !== null && newText.trim() !== '') {
      setTodos(todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo));
    }
  };

  const deleteDone = () => {
    setTodos(todos.filter(todo => !todo.done));
  };

  const deleteAll = () => {
    setTodos([]);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Done') return todo.done;
    if (filter === 'Todo') return !todo.done;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <h2 className="text-2xl font-bold mb-6">Todo-App</h2>

      <div className="w-full max-w-md flex flex-col gap-3">
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <input
            className="flex-1 p-3 outline-none"
            type="text"
            placeholder="New Todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </div>
        <button
          onClick={addTodo}
          className="bg-teal-500 text-white p-2 rounded-md hover:bg-teal-600"
        >
          Add new task
        </button>
      </div>

      <h2 className="text-2xl font-bold my-6">TodoList</h2>

      <div className="flex gap-4 mb-6">
        {['All', 'Done', 'Todo'].map(btn => (
          <button
            key={btn}
            onClick={() => setFilter(btn)}
            className={`px-6 py-2 rounded-md ${
              filter === btn
                ? 'bg-teal-600 text-white'
                : 'bg-teal-400 text-white hover:bg-teal-500'
            }`}
          >
            {btn}
          </button>
        ))}
      </div>

      <div className="w-full max-w-md flex flex-col gap-3 mb-6">
        {filteredTodos.map(todo => (
          <div
            key={todo.id}
            className="flex justify-between items-center border border-gray-300 rounded-md px-3 py-2"
          >
            <span className={`${todo.done ? 'line-through text-red-500' : ''}`}>
              {todo.text}
            </span>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleDone(todo.id)}
              />
              <Pencil
                onClick={() => editTodo(todo.id)}
                className="text-yellow-500 cursor-pointer"
                size={18}
              />
              <Trash2
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 cursor-pointer"
                size={18}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={deleteDone}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Delete done tasks
        </button>
        <button
          onClick={deleteAll}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Delete all tasks
        </button>
      </div>
    </div>
  );
}

export default App;
