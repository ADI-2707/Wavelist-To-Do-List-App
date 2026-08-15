import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getTasks,
  searchTasks,
  createTask,
  updateTask,
  toggleTaskStatus,
  deleteTask
} from '../tasks';

describe('Tasks API Client', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('fetches tasks successfully from server', async () => {
    const mockTasks = [
      { _id: '1', title: 'Test Task', status: 'In Progress', dateTime: new Date().toISOString() }
    ];
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockTasks
    });

    const result = await getTasks();
    expect(result).toEqual(mockTasks);
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/tasks'));
  });

  it('falls back to local storage when server fetch fails', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network Error'));

    const result = await getTasks();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('searches tasks from server endpoint', async () => {
    const mockResults = [
      { _id: '2', title: 'Matching Search Task', description: 'Keyword test' }
    ];
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResults
    });

    const result = await searchTasks('Matching');
    expect(result).toEqual(mockResults);
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/tasks/search?q=Matching'));
  });

  it('creates task via POST request', async () => {
    const newTaskData = { title: 'New Task', dateTime: new Date().toISOString() };
    const createdTask = { _id: '3', ...newTaskData, status: 'In Progress' };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => createdTask
    });

    const result = await createTask(newTaskData);
    expect(result).toEqual(createdTask);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/tasks'),
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('updates task details via PUT request', async () => {
    const updateData = { title: 'Updated Title', priority: 'High' };
    const updatedTask = { _id: '1', ...updateData };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => updatedTask
    });

    const result = await updateTask('1', updateData);
    expect(result).toEqual(updatedTask);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/tasks/1'),
      expect.objectContaining({ method: 'PUT' })
    );
  });

  it('toggles task status via PATCH request', async () => {
    const toggledTask = { _id: '1', status: 'Completed' };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => toggledTask
    });

    const result = await toggleTaskStatus('1', 'In Progress');
    expect(result).toEqual(toggledTask);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/tasks/1/status'),
      expect.objectContaining({ method: 'PATCH' })
    );
  });

  it('deletes task via DELETE request', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Task deleted successfully', id: '1' })
    });

    const result = await deleteTask('1');
    expect(result).toEqual({ message: 'Task deleted successfully', id: '1' });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/tasks/1'),
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});
