const API_URL = 'http://localhost:5000/api/todos';

export const todoAPI = {
    // Get all todos
    getTodos: async () => {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch todos');
        }
        return await response.json();
    },

    // Create a new todo
    createTodo: async (title) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        });
        if (!response.ok) {
            throw new Error('Failed to create todo');
        }
        return await response.json();
    },

    // Update a todo
    updateTodo: async (id, updates) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });
        if (!response.ok) {
            throw new Error('Failed to update todo');
        }
        return await response.json();
    },

    // Delete a todo
    deleteTodo: async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete todo');
        }
        return await response.json();
    }
};