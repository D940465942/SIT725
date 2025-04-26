const express = require('express');
const path = require('path'); // Import the path module
const app = express();
const port = 3000;
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/myprojectDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB!');
});

const ProjectSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String,
});
const Project = mongoose.model('Project', ProjectSchema);

const sampleProject = new Project({
    title: "Kitten 4",
    image: "images/kitten-4.jpg",
    link: "About Kitten 4",
    description: "Demo description about kitten 4"
});
sampleProject.save().then(() => console.log("Sample project saved!"));


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

// const cardList = [
//     {
//         title: "Kitten 2",
//         image: "images/kitten-2.jpg",
//         link: "About Kitten 2",
//         desciption: "Demo desciption about kitten 2"
//     },
//     {
//         title: "Kitten 3",
//         image: "images/kitten-3.jpg",
//         link: "About Kitten 3",
//         desciption: "Demo desciption about kitten 3"
//     }
// ]

app.get('/api/projects', async (req, res) => {
    // res.json({ statusCode: 200, data: cardList, message: "Success" })
    const projects = await Project.find({});
    res.json({ statusCode: 200, data: projects, message: "Success" });
})


// // Start the server
// var server = app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });


let io = require('socket.io')(3000);
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 10));
    }, 1000);
});

