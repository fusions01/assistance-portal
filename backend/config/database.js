const { Pool } = require('pg');

// Create a new pool instance to connect to PostgreSQL
const pool = new Pool({
    user: 'your_username', // replace with your database username
    host: 'localhost', // replace with your database host
    database: 'your_database', // replace with your database name
    password: 'your_password', // replace with your database password
    port: 5432, // replace with your database port, if different
});

// Export the pool to be used in other modules
module.exports = pool;