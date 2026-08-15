import React, { useState, useEffect } from 'react';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Search from './pages/Search';
import TaskFormModal from './components/TaskFormModal';
import {
  getTasks,
  createTask as apiCreateTask,
  updateTask as apiUpdateTask,
  toggleTaskStatus as apiToggleTaskStatus,
  deleteTask as apiDeleteTask
} from './api/tasks';

export default function App() {
  const [currentPage, setCurrentPage] = useState('onboarding');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateOrUpdateTask = async (taskData) => {
    if (editingTask) {
      const updated = await apiUpdateTask(editingTask._id, taskData);
      setTasks((prev) => prev.map((t) => (t._id === editingTask._id ? updated : t)));
    } else {
      const created = await apiCreateTask(taskData);
      setTasks((prev) => [created, ...prev]);
    }
    setEditingTask(null);
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Completed' ? 'In Progress' : 'Completed';
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t))
    );
    await apiToggleTaskStatus(id, currentStatus);
  };

  const handleDeleteTask = async (id) => {
    setTasks((prev) => prev.filter((t) => t._id !== id));
    await apiDeleteTask(id);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleOpenNewTaskModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-page-bg font-sans">
      {currentPage === 'onboarding' && (
        <Onboarding onGetStarted={() => setCurrentPage('home')} />
      )}

      {currentPage === 'home' && (
        <Home
          tasks={tasks}
          loading={loading}
          onOpenSearch={() => setCurrentPage('search')}
          onToggleStatus={handleToggleStatus}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onOpenNewTaskModal={handleOpenNewTaskModal}
          onViewTaskDetail={handleEditTask}
          onRefresh={loadTasks}
          isAddingTask={isModalOpen && !editingTask}
        />
      )}

      {currentPage === 'search' && (
        <Search
          allTasks={tasks}
          onBack={() => setCurrentPage('home')}
          onToggleStatus={handleToggleStatus}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onViewTaskDetail={handleEditTask}
        />
      )}

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrUpdateTask}
        initialTask={editingTask}
      />
    </div>
  );
}
