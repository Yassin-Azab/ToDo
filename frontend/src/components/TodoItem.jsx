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
            console.error('Error toggling todo:', error);
            alert('Failed to update todo');
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
            console.error('Error renaming todo:', error);
            alert('Failed to rename todo');
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
                console.error('Error deleting todo:', error);
                alert('Failed to delete todo');
            } finally {
                setLoading(false);
            }
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
                            disabled={loading}
                            className="edit-input"
                            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
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
            </div>
        </div>
    );
};

export default TodoItem;