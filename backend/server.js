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
    password: 'secoms319final',
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
app.get('/ratings/:itemId', (req, res) => {
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
app.post('/ratings/:itemId', (req, res) => {
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


// Start the server
app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
