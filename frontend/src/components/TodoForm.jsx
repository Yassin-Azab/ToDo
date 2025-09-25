import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        setLoading(true);
        try {
            await onAdd(title);
            setTitle('');
        } catch (error) {
            console.error('Error adding todo:', error);
            alert('Failed to add todo');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <div className="input-group">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a new todo..."
                    disabled={loading}
                    className="form-input"
                />
                <button 
                    type="submit" 
                    disabled={loading || !title.trim()}
                    className="add-button"
                >
                    {loading ? 'Adding...' : 'Add'}
                </button>
            </div>
        </form>
    );
};

export default TodoForm;