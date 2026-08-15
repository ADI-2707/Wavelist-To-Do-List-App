const request = require('supertest');
const app = require('../app');

describe('Health and readiness endpoints', () => {
    describe('GET /api/health', () => {
        it('returns HTTP 200 and confirms the API process is alive', async () => {
            const res = await request(app).get('/api/health');

            expect(res.statusCode).toBe(200);

            expect(res.body).toEqual(
                expect.objectContaining({
                    status: 'ok',
                    service: 'wavelist-api',
                })
            );

            expect(res.body.timestamp).toEqual(expect.any(String));

            expect(['connected', 'disconnected']).toContain(
                res.body.dbState
            );

            expect(() => new Date(res.body.timestamp)).not.toThrow();
        });
    });

    describe('GET /api/ready', () => {
        it('returns a valid readiness response', async () => {
            const res = await request(app).get('/api/ready');

            expect([200, 503]).toContain(res.statusCode);

            expect(res.body).toEqual(
                expect.objectContaining({
                    service: 'wavelist-api',
                    timestamp: expect.any(String),
                })
            );

            if (res.statusCode === 200) {
                expect(res.body.status).toBe('ready');
                expect(res.body.dbState).toBe('connected');
            }

            if (res.statusCode === 503) {
                expect(res.body.status).toBe('not_ready');
                expect(res.body.dbState).toBe('disconnected');
            }
        });
    });

    describe('unknown routes', () => {
        it('returns HTTP 404 for an unknown route', async () => {
            const res = await request(app).get('/api/does-not-exist');

            expect(res.statusCode).toBe(404);

            expect(res.body).toEqual({
                status: 'error',
                message: 'Route not found',
                path: '/api/does-not-exist',
            });
        });
    });
});