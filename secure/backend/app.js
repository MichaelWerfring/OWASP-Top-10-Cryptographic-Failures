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
const https = require('https');
var key = fs.readFileSync(__dirname + '/../certs/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/../certs/selfsigned.crt');
var options = {
  key: key,
  cert: cert
};

app = express()
app.get('/', (req, res) => {
   res.send('Now using https..');
});
app.use(cors());
app.use(express.json()); 
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    res.send('Now using https..');
 });

var server = https.createServer(options, app);

server.listen(port, () => {
  console.log("server starting on port : " + port)
});

server.post('/login', (req, res) => {
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

server.get('/profile', verifyToken, (req, res) => {
    console.log(`Profile request received for ${req.user.username}`);
    res.json({ message: 'Profile accessed successfully', user: req.user });
  });

  app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Error logging out');
        } else {
            console.log('User logged out successfully');
            res.status(200).send('Logged out successfully');
        }
    });
});