const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "nick",
    password: 'password',
    database: 'secoms319final'
});

// Connecting error check
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// simple route for testing
app.get('/', (req, res) => {
    return res.json("From Backend Side");
});

// GET
// fetch all items from metalcore_merch table in secoms319final database
app.get('/items', (req, res) => {
    db.query('SELECT * FROM metalcore_merch', (err, results) => {
        if (err) {
            res.status(500).send('Error fetching items from the database');
            return;
        }
        res.json(results);
    });
});

// GET
// endpoint for getting current ratings
app.get('/rating/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    db.query('SELECT rating FROM itemRatings WHERE itemId = ?', [itemId], (err, result) => {
        if (err) {
            res.status(500).send('Error fetching rating from the database');
            return;
        }
        res.json(result[0]);
    });
});

// POST
// endpoint for posting new ratings
app.post('/rating/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    const { rating } = req.body;
    db.query('INSERT INTO itemRatings (itemId, rating) VALUES (?, ?) ON DUPLICATE KEY UPDATE rating = ?', [itemId, rating, rating], (err, result) => {
        if (err) {
            res.status(500).send('Error updating rating in the database');
            return;
        }
        res.json({ success: true });
    });
});

// DELETE
// delete an item from metalcore_merch table
app.delete('/items/:id', (req, res) => {
    const itemId = req.params.id;
    db.query('DELETE FROM metalcore_merch WHERE id = ?', [itemId], (err, result) => {
        if (err) {
            res.status(500).send('Error deleting item from the database');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Item not found');
            return;
        }
        res.json({ success: true });
    });
});

// PUT endpoint to update an item's price
app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { price } = req.body;
    db.query('UPDATE metalcore_merch SET price = ? WHERE id = ?', [price, id], (err, result) => {
      if (err) {
        res.status(500).send('Error updating item in the database');
        return;
      }
      res.json({ success: true });
    });
  });
  

// POST endpoint to add a new item to the metalcore_merch table
app.post('/items', (req, res) => {
    // Include rating in the destructured object
    const { name, price, image, rating } = req.body;

    // Make sure your metalcore_merch table has a column named 'rating'
    const query = 'INSERT INTO metalcore_merch (name, price, image, rating) VALUES (?, ?, ?, ?)';

    // Include rating in the parameters array
    db.query(query, [name, price, image, rating], (err, result) => {
        if (err) {
            res.status(500).send('Error adding new item to the database');
            return;
        }
        res.status(201).json({ success: true, message: "New item added.", id: result.insertId });
    });
});




// Start the server
app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
