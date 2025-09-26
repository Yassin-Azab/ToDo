import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onRename, onRemove }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [loading, setLoading] = useState(false);

    const handleToggle = async () => {
        if (loading) return;
        setLoading(true);
        try {
            await onToggle(todo._id, { done: !todo.done });
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditTitle(todo.title);
    };

    const handleSave = async () => {
        if (!editTitle.trim()) return;

        setLoading(true);
        try {
            await onRename(todo._id, { title: editTitle });
            setIsEditing(false);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditTitle(todo.title);
    };

    const handleDelete = async () => {
        if (loading) return;
        
        if (window.confirm('Are you sure you want to delete this todo?')) {
            setLoading(true);
            try {
                await onRemove(todo._id);
            } catch (error) {
                alert(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    return (
        <div className={`todo-item ${todo.done ? 'completed' : ''} ${loading ? 'loading' : ''}`}>
            <div className="todo-content">
                <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={handleToggle}
                    disabled={loading}
                    className="todo-checkbox"
                />
                
                {isEditing ? (
                    <div className="edit-form">
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onKeyDown={handleKeyPress}
                            disabled={loading}
                            className="edit-input"
                            autoFocus
                        />
                        <div className="edit-actions">
                            <button onClick={handleSave} disabled={loading} className="save-btn">
                                Save
                            </button>
                            <button onClick={handleCancel} disabled={loading} className="cancel-btn">
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <span 
                            className="todo-title"
                            onDoubleClick={handleEdit}
                        >
                            {todo.title}
                        </span>
                        <div className="todo-actions">
                            <button onClick={handleEdit} disabled={loading} className="edit-btn">
                                Edit
                            </button>
                            <button onClick={handleDelete} disabled={loading} className="delete-btn">
                                Delete
                            </button>
                        </div>
                    </>
                )}
            </div>
            <div className="todo-meta">
                <small>Created: {new Date(todo.createdAt).toLocaleDateString()}</small>
                {todo.updatedAt !== todo.createdAt && (
                    <small>Updated: {new Date(todo.updatedAt).toLocaleDateString()}</small>
                )}
            </div>
        </div>
    );
};

export default TodoItem;