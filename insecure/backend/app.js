const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const db = {
    users: [
        { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1'},
        { id: 2, username: 'user2', email: 'user2@example.com', password: 'password2'},
        { id: 3, username: 'user3', email: 'user3@example.com', password: 'password3'}
    ],
    authenticateUser: function(username, password) {
        const user = this.users.find(user => user.username === username && user.password === password);
        return user ? user : null;
    },
    getUserByUsername(username) {
        return this.users.find(user => user.username === username);
    }
};
const cors = require('cors');
const app = express();
const port = 3001;
const games = {};
const secretKey = 'your-secret-key';

app.use(cors());
app.use(express.json()); 
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.post('/login', (req, res) => {
    console.log(`Login request received ${req.body.username}/${req.body.password}`);
    const { username, password } = req.body;
    const user = db.authenticateUser(username, password);
    if (user) {
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        res.json({ "token":token, "user" :db.getUserByUsername(username) });
        console.log(`User ${user.username} logged in`);
    } else {
        res.status(401).send('Invalid username or password');
    }
});

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).json({ error: 'Token is required' });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      req.user = decoded;
      next();
    });
  };

app.get('/profile', verifyToken, (req, res) => {
    console.log(`Profile request received for ${req.user.username}`);
    res.json({ message: 'Profile accessed successfully', user: req.user });
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
