const mysql = require('mysql');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '0000'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL.');

    db.query('CREATE DATABASE IF NOT EXISTS products_db', (err, result) => {
        if (err) {
            console.error('Error creating database:', err);
            return;
        }
        console.log('Database created or already exists.', result);

        db.changeUser({ database: 'products_db' }, (err) => {
            if (err) {
                console.error('Error switching to products_db:', err);
                return;
            }
            console.log('Switched to products_db database.');

            const createTableQuery = `
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                category VARCHAR(255) NOT NULL,
                description TEXT
            )
            `;

            db.query(createTableQuery, (err, result) => {
                if (err) {
                    console.error('Error creating products table:', err);
                    return;
                }
                console.log('Products table created or already exists.');
                
                
                db.end((err) => {
                    if (err) {
                        console.error('Error closing the database connection:', err);
                    } else {
                        console.log('Database connection closed.');
                    }
                });
            });
        });
    });
});

module.exports = db;
