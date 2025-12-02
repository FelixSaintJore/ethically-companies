const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'data', 'tracking.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + dbPath, err);
    } else {
        console.log('Connected to the tracking database.');
        initDb();
    }
});

function initDb() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS tracking (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_uid TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            action_type TEXT,
            action_detail TEXT
        )
    `;

    db.run(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating table', err);
        } else {
            console.log('Tracking table ready.');
        }
    });
}

module.exports = db;
