const express = require('express');
const path = require('path'); // Import the path module
const app = express();
const port = 3000;
const mongoose = require('mongoose');

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (like HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the form page
app.get('/', (req, res) => {
    // Serve the HTML form page
    res.sendFile(__dirname + '/public_html/index.html');
});

app.get('/index.html', (req, res) => {
    // Serve the HTML form page
    res.sendFile(__dirname + '/public_html/index.html');
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});