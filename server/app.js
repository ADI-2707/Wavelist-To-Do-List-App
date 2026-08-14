const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date(),
        dbState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

module.exports = app;