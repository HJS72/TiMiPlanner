const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'timiplanner.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database opening error: ', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.serialize(() => {
    // Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT,
        role TEXT DEFAULT 'child',
        language TEXT DEFAULT 'en',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tasks table
    db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        assigned_to INTEGER NOT NULL,
        assigned_by INTEGER,
        date DATE NOT NULL,
        time TEXT NOT NULL,
        duration INTEGER DEFAULT 30,
        completed BOOLEAN DEFAULT 0,
        recurrence TEXT,
        color TEXT DEFAULT 'green',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (assigned_to) REFERENCES users(id),
        FOREIGN KEY (assigned_by) REFERENCES users(id)
      )
    `);

    // Settings table
    db.run(`
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        setting_key TEXT NOT NULL,
        setting_value TEXT,
        UNIQUE(user_id, setting_key),
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Sessions table
    db.run(`
      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        token TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        expires_at DATETIME,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Check if demo users exist, if not create them
    db.all(`SELECT COUNT(*) as count FROM users`, (err, rows) => {
      if (err) {
        console.error('Error checking users:', err);
        return;
      }
      
      if (rows[0].count === 0) {
        // Insert demo users
        db.run(`INSERT INTO users (username, password, name, role, language) VALUES (?, ?, ?, ?, ?)`,
          ['parent', 'parent', 'Parent', 'parent', 'en']);
        db.run(`INSERT INTO users (username, password, name, role, language) VALUES (?, ?, ?, ?, ?)`,
          ['lina', 'lina', 'Lina', 'child', 'en']);
        db.run(`INSERT INTO users (username, password, name, role, language) VALUES (?, ?, ?, ?, ?)`,
          ['max', 'max', 'Max', 'child', 'en']);
        
        console.log('Demo users created');
      }
    });
  });
}

module.exports = db;
