const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors package

const app = express();
const PORT = 3000;

// Use cors middleware
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Handle login request
app.post('/login', (req, res) => {
    console.log('login accessed');
    const { email, password } = req.body;

    // Dummy user for illustration purposes
    const user = {
        email: 'vismayj@commercient.online',
        password: 'password123'
    };

    if (email === user.email && password === user.password) {
        res.status(200).send({ message: 'Login successful' });
    } else {
        res.status(401).send({ message: 'Invalid email or password' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
