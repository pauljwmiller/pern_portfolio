const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Penguin9",
    host: "localhost",
    port: 5432,
    database: "pernproject"
});

module.exports = pool;