const dotenv = require('dotenv');
dotenv.config();

const config = {
  marvel: {
    PUBLIC_KEY: process.env.PUBLIC_KEY,
    PRIVATE_KEY: process.env.PRIVATE_KEY
  },
  server: {
    APPLICATION_PORT: process.env.PORT
  }
}

module.exports = config;