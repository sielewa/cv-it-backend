const path = require('path');
require('dotenv').config({ path: './.env' });

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },

    migrations: {
      tableName: 'migrations',
      directory: path.join(__dirname, '/migrations')
    }
  }
};
