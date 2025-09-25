import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onRename, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggle = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await onToggle(todo._id, { done: !todo.done });
    } catch (error) {
      console.error('Error toggling todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
  };

  const handleSave = async () => {
    if (!editTitle.trim()) return;

    setIsSubmitting(true);
    try {
      await onRename(todo._id, { title: editTitle.trim() });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
  };

  const handleDelete = async () => {
    if (isSubmitting) return;

    if (window.confirm('Are you sure you want to delete this todo?')) {
      setIsSubmitting(true);
      try {
        await onRemove(todo._id);
      } catch (error) {
        console.error('Error deleting todo:', error);
      } finally {
        setIsSubmitting(false);
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
    <div className={`todo-item ${todo.done ? 'completed' : ''} ${isSubmitting ? 'submitting' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={handleToggle}
          disabled={isSubmitting}
          className="todo-checkbox"
        />
        
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            onBlur={handleSave}
            autoFocus
            className="edit-input"
            disabled={isSubmitting}
          />
        ) : (
          <span 
            className="todo-title"
            onDoubleClick={handleEdit}
          >
            {todo.title}
          </span>
        )}
      </div>
      
      <div className="todo-actions">
        {isEditing ? (
          <>
            <button 
              onClick={handleSave} 
              disabled={!editTitle.trim() || isSubmitting}
              className="save-button"
            >
              Save
            </button>
            <button 
              onClick={handleCancel} 
              disabled={isSubmitting}
              className="cancel-button"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={handleEdit} 
              disabled={isSubmitting}
              className="edit-button"
            >
              Edit
            </button>
            <button 
              onClick={handleDelete} 
              disabled={isSubmitting}
              className="delete-button"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;