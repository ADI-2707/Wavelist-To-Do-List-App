const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        service: 'wavelist-api',
        timestamp: new Date().toISOString(),
        dbState:
            mongoose.connection.readyState === 1
                ? 'connected'
                : 'disconnected',
    });
});

app.get('/api/ready', (req, res) => {
    const dbConnected = mongoose.connection.readyState === 1;

    if (!dbConnected) {
        return res.status(503).json({
            status: 'not_ready',
            service: 'wavelist-api',
            dbState: 'disconnected',
            timestamp: new Date().toISOString(),
        });
    }

    return res.status(200).json({
        status: 'ready',
        service: 'wavelist-api',
        dbState: 'connected',
        timestamp: new Date().toISOString(),
    });
});

const taskRoutes = require('./routes/tasks');

app.use('/api/tasks', taskRoutes);

app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found',
        path: req.originalUrl,
    });
});

app.use((err, req, res, next) => {
    console.error('Unhandled server error:', err);

    res.status(err.status || 500).json({
        status: 'error',
        message:
            process.env.NODE_ENV === 'production'
                ? 'Internal server error'
                : err.message,
    });
});

module.exports = app;