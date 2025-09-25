import React, { useState, useEffect, useCallback } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { getTodos, createTodo, updateTodo, deleteTodo } from './services/api';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch todos on component mount
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const todosData = await getTodos();
      setTodos(todosData);
      setError('');
    } catch (err) {
      setError('Failed to load todos. Please try again.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Add new todo
  const handleAdd = useCallback(async (title) => {
    try {
      const newTodo = await createTodo(title);
      setTodos(prevTodos => [newTodo, ...prevTodos]);
      setError('');
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      throw err;
    }
  }, []);

  // Toggle todo completion
  const handleToggle = useCallback(async (id, updateData) => {
    try {
      const updatedTodo = await updateTodo(id, updateData);
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo._id === id ? updatedTodo : todo
        )
      );
      setError('');
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      throw err;
    }
  }, []);

  // Rename todo
  const handleRename = useCallback(async (id, updateData) => {
    try {
      const updatedTodo = await updateTodo(id, updateData);
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo._id === id ? updatedTodo : todo
        )
      );
      setError('');
    } catch (err) {
      setError('Failed to rename todo. Please try again.');
      throw err;
    }
  }, []);

  // Remove todo
  const handleRemove = useCallback(async (id) => {
    try {
      await deleteTodo(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      throw err;
    }
  }, []);

  const clearError = () => setError('');

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>Todo List</h1>
          <p>Manage your tasks efficiently</p>
        </header>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={clearError} className="dismiss-button">×</button>
          </div>
        )}

        <TodoForm onAdd={handleAdd} />

        <TodoList
          todos={todos}
          loading={loading}
          onToggle={handleToggle}
          onRename={handleRename}
          onRemove={handleRemove}
        />
      </div>
    </div>
  );
};

export default App;