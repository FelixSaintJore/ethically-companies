const express = require('express');
const path = require('path');
const db = require('./database');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to serve the catalog
app.get('/data/catalog.json', (req, res) => {
    const catalogPath = path.join(__dirname, 'data', 'catalog.json');
    fs.readFile(catalogPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading catalog file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

// Endpoint to receive tracking data
app.post('/api/track', (req, res) => {
    const { uid, action_type, action_detail } = req.body;

    if (!uid || !action_type) {
        return res.status(400).json({ error: 'Missing required fields: uid, action_type' });
    }

    const query = `INSERT INTO tracking (user_uid, action_type, action_detail) VALUES (?, ?, ?)`;
    db.run(query, [uid, action_type, action_detail || ''], function(err) {
        if (err) {
            console.error('Error inserting tracking data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Tracking logged', id: this.lastID });
    });
});

// Endpoint to view tracking data (for verification/assignment)
app.get('/api/admin/tracking', (req, res) => {
    db.all("SELECT * FROM tracking ORDER BY timestamp DESC LIMIT 100", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            count: rows.length,
            data: rows
        });
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
