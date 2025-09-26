import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/todos';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoAPI = {
    // Get all todos
    getTodos: async () => {
        const response = await api.get('/');
        return response.data;
    },

    // Create a new todo
    createTodo: async (title) => {
        const response = await api.post('/', { title });
        return response.data;
    },

    // Update a todo
    updateTodo: async (id, updates) => {
        const response = await api.put(`/${id}`, updates);
        return response.data;
    },

    // Delete a todo
    deleteTodo: async (id) => {
        const response = await api.delete(`/${id}`);
        return response.data;
    }
};