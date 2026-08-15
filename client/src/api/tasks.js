const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const DEFAULT_TASKS = [
  {
    _id: 'mock-1',
    title: 'Mobile App Wireframe Design',
    description: 'Create low-fidelity wireframes for onboarding and home screens',
    dateTime: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
    priority: 'High',
    status: 'In Progress',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'mock-2',
    title: 'Team Standup Meeting',
    description: 'Discuss sprint progress and blockers',
    dateTime: new Date(new Date().setHours(14, 30, 0, 0)).toISOString(),
    priority: 'Medium',
    status: 'In Progress',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'mock-3',
    title: 'Review Pull Requests',
    description: 'Check frontend styling and unit test results',
    dateTime: new Date(new Date().setHours(16, 0, 0, 0)).toISOString(),
    priority: 'Low',
    status: 'Completed',
    createdAt: new Date().toISOString()
  }
];

const getLocalTasks = () => {
  try {
    const stored = localStorage.getItem('wavelist_tasks');
    if (!stored) {
      localStorage.setItem('wavelist_tasks', JSON.stringify(DEFAULT_TASKS));
      return DEFAULT_TASKS;
    }
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_TASKS;
  }
};

const saveLocalTasks = (tasks) => {
  try {
    localStorage.setItem('wavelist_tasks', JSON.stringify(tasks));
  } catch (e) {}
};

export const getTasks = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks`);
    if (!res.ok) throw new Error('API server returned error');
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('API fetch failed, fallback to local storage:', err.message);
    return getLocalTasks();
  }
};

export const searchTasks = async (query) => {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('API search failed');
    return await res.json();
  } catch (err) {
    const q = query.toLowerCase();
    const local = getLocalTasks();
    return local.filter(t => t.title.toLowerCase().includes(q) || (t.description && t.description.toLowerCase().includes(q)));
  }
};

export const createTask = async (taskData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    });
    if (!res.ok) throw new Error('API create failed');
    return await res.json();
  } catch (err) {
    const local = getLocalTasks();
    const newTask = {
      ...taskData,
      _id: 'local-' + Date.now(),
      status: taskData.status || 'In Progress',
      createdAt: new Date().toISOString()
    };
    const updated = [newTask, ...local];
    saveLocalTasks(updated);
    return newTask;
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    });
    if (!res.ok) throw new Error('API update failed');
    return await res.json();
  } catch (err) {
    const local = getLocalTasks();
    let updatedTask = null;
    const updatedList = local.map(t => {
      if (t._id === id) {
        updatedTask = { ...t, ...taskData };
        return updatedTask;
      }
      return t;
    });
    saveLocalTasks(updatedList);
    return updatedTask || { _id: id, ...taskData };
  }
};

export const toggleTaskStatus = async (id, currentStatus) => {
  const newStatus = currentStatus === 'Completed' ? 'In Progress' : 'Completed';
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (!res.ok) throw new Error('API toggle status failed');
    return await res.json();
  } catch (err) {
    const local = getLocalTasks();
    let updatedTask = null;
    const updatedList = local.map(t => {
      if (t._id === id) {
        updatedTask = { ...t, status: newStatus };
        return updatedTask;
      }
      return t;
    });
    saveLocalTasks(updatedList);
    return updatedTask;
  }
};

export const deleteTask = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('API delete failed');
    return await res.json();
  } catch (err) {
    const local = getLocalTasks();
    const filtered = local.filter(t => t._id !== id);
    saveLocalTasks(filtered);
    return { id };
  }
};
