const Todo = require('../models/Todo');
const mongoose = require('mongoose');


// @desc    Get all todos
// @route   GET /api/todos
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Create a new todo
// @route   POST /api/todos
const createTodo = async (req, res) => {
    try {
        const { title } = req.body;
        
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const todo = new Todo({ title });
        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update a todo
// @route   PUT /api/todos/:id
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, done } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid todo ID' });
        }

        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        if (title !== undefined) todo.title = title;
        if (done !== undefined) todo.done = done;

        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid todo ID' });
        }

        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        await Todo.findByIdAndDelete(id);
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
};