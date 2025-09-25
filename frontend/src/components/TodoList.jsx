import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, loading, onToggle, onRename, onRemove }) => {
    if (loading && todos.length === 0) {
        return <div className="loading">Loading todos...</div>;
    }

    if (todos.length === 0) {
        return <div className="no-todos">No todos found. Add one above!</div>;
    }

    return (
        <div className="todo-list">
            {todos.map(todo => (
                <TodoItem
                    key={todo._id}
                    todo={todo}
                    onToggle={onToggle}
                    onRename={onRename}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
};

export default TodoList;