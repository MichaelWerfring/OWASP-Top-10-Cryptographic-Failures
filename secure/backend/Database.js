class Database {
    constructor() {
        this.users = [
            { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1'},
            { id: 2, username: 'user2', email: 'user2@example.com', password: 'password2'},
            { id: 3, username: 'user3', email: 'user3@example.com', password: 'password3'}
        ];
    }

    // Method to retrieve all users
    getAllUsers() {
        return this.users;
    }

    // Method to retrieve a user by ID
    getUserById(id) {
        return this.users.find(user => user.id === id);
    }

    // Method to retrieve a user by username
    getUserByUsername(username) {
        return this.users.find(user => user.username === username);
    }

    // Method to authenticate a user by username and password
    authenticateUser(username, password) {
        const user = this.users.find(user => user.username === username && user.password === password);
        return user ? user : null;
    }
}
