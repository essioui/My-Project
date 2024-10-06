const express = require("express");
const mysql = require('mysql');
const cors = require('cors');


const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '0000',
    database: 'products_db'
});

db.connect((err) => {
    if(err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL.');

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
        if(err) throw err;
        console.log('Products table created or already exists.');
    });
});


app.use(cors());
app.use(express.json());

app.post('/api/products', (req, res) => {
    const { name, price, category, description } = req.body;

    if(!name || !price || !category || price <= 0) {
        return res.status(400).json({ error: 'Invalid product data'})
    }

    const query = 'INSERT INTO products (name, price, category, description) VALUES (?, ?, ?, ?)';

    db.query(query, [name, price, category, description || null], (err, result) => {
        if(err) {
            return res.status(500).json({ error: 'Database error'});
        }

        res.status(201).json({ message: 'Productssaved successfully', product: {id: result.insertId, name, price, category, description } });
    });
});






app.get('/api/products', (req, res) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  });
  

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
