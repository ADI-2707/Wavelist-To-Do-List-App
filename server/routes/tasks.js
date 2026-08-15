const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/search', taskController.searchTasks);
router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.patch('/:id/status', taskController.toggleTaskStatus);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
