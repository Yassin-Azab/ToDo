import React, { useState, useEffect, useCallback } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { todoAPI } from './services/api';

function App() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch todos from API
    const fetchTodos = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const todosData = await todoAPI.getTodos();
            setTodos(todosData);
        } catch (err) {
            setError('Failed to load todos. Please check if the server is running.');
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
            const newTodo = await todoAPI.createTodo(title);
            setTodos(prev => [newTodo, ...prev]);
        } catch (err) {
            console.error('Error adding todo:', err);
            throw new Error('Failed to add todo. Please try again.');
        }
    }, []);

    // Toggle todo completion
    const handleToggle = useCallback(async (id, updates) => {
        try {
            const updatedTodo = await todoAPI.updateTodo(id, updates);
            setTodos(prev => prev.map(todo => 
                todo._id === id ? updatedTodo : todo
            ));
        } catch (err) {
            console.error('Error toggling todo:', err);
            throw new Error('Failed to update todo. Please try again.');
        }
    }, []);

    // Rename todo
    const handleRename = useCallback(async (id, updates) => {
        try {
            const updatedTodo = await todoAPI.updateTodo(id, updates);
            setTodos(prev => prev.map(todo => 
                todo._id === id ? updatedTodo : todo
            ));
        } catch (err) {
            console.error('Error renaming todo:', err);
            throw new Error('Failed to rename todo. Please try again.');
        }
    }, []);

    // Remove todo
    const handleRemove = useCallback(async (id) => {
        try {
            await todoAPI.deleteTodo(id);
            setTodos(prev => prev.filter(todo => todo._id !== id));
        } catch (err) {
            console.error('Error deleting todo:', err);
            throw new Error('Failed to delete todo. Please try again.');
        }
    }, []);

    return (
        <div className="app">
            <div className="container">
                <header className="app-header">
                    <h1>TodoList MERN App</h1>
                    <p>Manage your tasks efficiently</p>
                </header>

                {error && (
                    <div className="error-message">
                        {error}
                        <button onClick={fetchTodos} className="retry-btn">Retry</button>
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
}

export default App;