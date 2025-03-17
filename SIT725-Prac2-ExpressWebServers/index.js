const express = require('express');
const path = require('path'); // Import the path module
const app = express();
const port = 3000;

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

// GET request to add two numbers
app.get('/add', (req, res) => {
    const { num1, num2 } = req.query;

    if (!num1 || !num2) {
        return res.status(400).json({ error: 'Please provide both num1 and num2 as query parameters.' });
    }

    const result = parseFloat(num1) + parseFloat(num2);
    res.json({ result });
});

// POST request to perform basic calculator operations
app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;

    if (!num1 || !num2 || !operation) {
        return res.status(400).json({ error: 'Please provide num1, num2, and operation in the request body.' });
    }

    let result;
    switch (operation) {
        case 'add':
            result = parseFloat(num1) + parseFloat(num2);
            break;
        case 'subtract':
            result = parseFloat(num1) - parseFloat(num2);
            break;
        case 'multiply':
            result = parseFloat(num1) * parseFloat(num2);
            break;
        case 'divide':
            if (parseFloat(num2) === 0) {
                return res.status(400).json({ error: 'Division by zero is not allowed.' });
            }
            result = parseFloat(num1) / parseFloat(num2);
            break;
        default:
            return res.status(400).json({ error: 'Invalid operation. Supported operations are add, subtract, multiply, and divide.' });
    }

    res.json({ result });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});