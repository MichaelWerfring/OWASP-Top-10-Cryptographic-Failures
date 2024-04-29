const express = require('express');
const session = require('express-session');
const db = require('./Database');
const app = express();
const port = 3001;
const games = {};

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

app.post('/game', (req, res) => {
    //if just session id create new game
    //if game id, index and X/O then make move

    const sessionId = req.sessionID;
    const { gameId, index, turn } = req.body;

    if (!gameId) {
        // Create a new game
        const newGame = new Game();
        games[sessionId] = newGame;
        res.json({ gameId: newGame.gameId });
    } else {
        // Make a move in an existing game
        const game = games[sessionId];
        if (!game) {
            res.status(400).json({ error: 'No game found for this session' });
            return;
        }

        game.makeMove(gameId, index, turn);
        res.json(game.getGame(gameId));
    }
});

app.get('/game', (req, res) => {
    //if game id, return game state
    //including board, turn, winner
    const { gameId } = req.query;
    const game = games[req.sessionID];

    if (!game) {
        res.status(400).json({ error: 'No game found for this session' });
        return;
    }

    if (!gameId) {
        res.status(400).json({ error: 'Game ID is required' });
        return;
    }

    res.json(game.getGame(gameId));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
