import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title for the todo'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  done: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Todo', todoSchema);