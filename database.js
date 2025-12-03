const sqlite3 = require('sqlite3').verbose(); // charge la bdd
const path = require('path'); // recup les fichers

const dbPath = path.resolve(__dirname, 'data', 'tracking.db'); // definit le nom bdd et le path

const db = new sqlite3.Database(dbPath, (err) => { // creer, ouvre et connecte a la bdd
    if (err) {
        console.error('Error opening database ' + dbPath, err);
    } else {
        console.log('Connected to the tracking database.');
        initDb();
    }
});

function initDb() { // initialisation de la bdd et sa structure
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

module.exports = db; // ouvre l'acces a la bdd pour les autres fichiers
