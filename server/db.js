const Pool = require("pg").Pool;

// This file is now safe for GitHub because it has NO passwords
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;