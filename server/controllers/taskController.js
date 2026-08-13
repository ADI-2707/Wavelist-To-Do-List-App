const Task = require('../models/Task');

// GET /api/tasks - Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ dateTime: 1, createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

// GET /api/tasks/search?q=keyword - Search tasks
exports.searchTasks = async (req, res) => {
  try {
    const query = req.query.q || '';
    if (!query.trim()) {
      const tasks = await Task.find().sort({ dateTime: 1 });
      return res.json(tasks);
    }
    const searchRegex = new RegExp(query, 'i');
    const tasks = await Task.find({
      $or: [
        { title: searchRegex },
        { description: searchRegex }
      ]
    }).sort({ dateTime: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error searching tasks', error: error.message });
  }
};

// POST /api/tasks - Create task
exports.createTask = async (req, res) => {
  try {
    const { title, description, dateTime, priority, status } = req.body;
    if (!title || !dateTime) {
      return res.status(400).json({ message: 'Title and dateTime are required fields' });
    }
    const newTask = new Task({
      title,
      description: description || '',
      dateTime,
      priority: priority || 'Medium',
      status: status || 'In Progress'
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error: error.message });
  }
};

// PUT /api/tasks/:id - Update task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dateTime, priority, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, dateTime, priority, status },
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: 'Error updating task', error: error.message });
  }
};

// PATCH /api/tasks/:id/status - Toggle status
exports.toggleTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (req.body.status && ['In Progress', 'Completed'].includes(req.body.status)) {
      task.status = req.body.status;
    } else {
      task.status = task.status === 'Completed' ? 'In Progress' : 'Completed';
    }
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: 'Error updating task status', error: error.message });
  }
};

// DELETE /api/tasks/:id - Delete task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully', id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};
