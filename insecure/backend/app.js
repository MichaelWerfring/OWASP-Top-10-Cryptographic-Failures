const express = require('express');
const session = require('express-session');
const db = require('./Database');
const app = express();
const port = 3001;

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = db.authenticateUser(username, password);
    if (user) {
        req.session.user = user;
        res.json(user);
        console.log(`User ${user.username} logged in`);
    } else {
        console.log(`User ${user.username} failed to log in`);
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logout successful');
    console.log(`User ${req.session.user.name} logged out`);
});

app.get('/profile', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).send('Unauthorized');
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
