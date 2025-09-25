import React, { useState, useEffect, useCallback } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { todoAPI } from './services/api';
import './App.css';

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
            setError('Failed to load todos');
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
        const newTodo = await todoAPI.createTodo(title);
        setTodos(prev => [newTodo, ...prev]);
    }, []);

    // Toggle todo completion
    const handleToggle = useCallback(async (id, updates) => {
        const updatedTodo = await todoAPI.updateTodo(id, updates);
        setTodos(prev => prev.map(todo => 
            todo._id === id ? updatedTodo : todo
        ));
    }, []);

    // Rename todo
    const handleRename = useCallback(async (id, updates) => {
        const updatedTodo = await todoAPI.updateTodo(id, updates);
        setTodos(prev => prev.map(todo => 
            todo._id === id ? updatedTodo : todo
        ));
    }, []);

    // Remove todo
    const handleRemove = useCallback(async (id) => {
        await todoAPI.deleteTodo(id);
        setTodos(prev => prev.filter(todo => todo._id !== id));
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