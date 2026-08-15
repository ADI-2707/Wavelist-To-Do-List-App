const request = require('supertest');
const app = require('../app');
const Task = require('../models/Task');

jest.mock('../models/Task');

describe('Task REST API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/tasks', () => {
    it('returns all tasks sorted by date and time', async () => {
      const mockTasks = [
        { _id: '1', title: 'Task One', status: 'In Progress' },
        { _id: '2', title: 'Task Two', status: 'Completed' }
      ];

      Task.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockTasks)
      });

      const res = await request(app).get('/api/tasks');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockTasks);
    });
  });

  describe('GET /api/tasks/search', () => {
    it('returns filtered tasks matching search query', async () => {
      const mockSearchResult = [{ _id: '1', title: 'Grocery Shopping' }];

      Task.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockSearchResult)
      });

      const res = await request(app).get('/api/tasks/search?q=Grocery');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockSearchResult);
    });
  });

  describe('POST /api/tasks', () => {
    it('returns 400 Bad Request when mandatory fields are missing', async () => {
      const res = await request(app).post('/api/tasks').send({ title: '' });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        message: 'Title and dateTime are required fields'
      });
    });

    it('creates and returns a new task when valid data is provided', async () => {
      const taskData = {
        title: 'New API Task',
        dateTime: new Date().toISOString(),
        priority: 'High'
      };

      const createdTask = { _id: 'new-100', ...taskData, status: 'In Progress' };

      Task.prototype.save = jest.fn().mockResolvedValue(createdTask);

      const res = await request(app).post('/api/tasks').send(taskData);

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(createdTask);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('updates and returns the task by ID', async () => {
      const updatePayload = {
        title: 'Updated Task Title',
        dateTime: new Date().toISOString(),
        status: 'Completed'
      };

      const updatedTask = { _id: '1', ...updatePayload };

      Task.findByIdAndUpdate.mockResolvedValue(updatedTask);

      const res = await request(app).put('/api/tasks/1').send(updatePayload);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(updatedTask);
    });

    it('returns 404 Not Found if task ID does not exist', async () => {
      Task.findByIdAndUpdate.mockResolvedValue(null);

      const res = await request(app)
        .put('/api/tasks/999')
        .send({ title: 'Title', dateTime: new Date().toISOString() });

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: 'Task not found' });
    });
  });

  describe('PATCH /api/tasks/:id/status', () => {
    it('toggles task status between In Progress and Completed', async () => {
      const existingTask = {
        _id: '1',
        title: 'Toggle Task',
        status: 'In Progress',
        save: jest.fn().mockResolvedValue({ _id: '1', status: 'Completed' })
      };

      Task.findById.mockResolvedValue(existingTask);

      const res = await request(app).patch('/api/tasks/1/status').send({ status: 'Completed' });

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('Completed');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('deletes the task and returns confirmation message', async () => {
      const deletedTask = { _id: '1', title: 'Task to Delete' };
      Task.findByIdAndDelete.mockResolvedValue(deletedTask);

      const res = await request(app).delete('/api/tasks/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        message: 'Task deleted successfully',
        id: '1'
      });
    });
  });
});
