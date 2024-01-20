const { QueryTypes } = require("sequelize");
const fs = require("fs");
const { Readable } = require("stream");

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,

  /** DATABASE */
  db: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    dialect: "mysql",
    dialectOptions: {
      multipleStatements: true,
      localInfile: true,
      streamFactory: (filename) => {
        const fileStream = fs.createReadStream(filename);
        const readableStream = new Readable().wrap(fileStream);
        return readableStream;
      },
    },

    // pool is optional, it will be used for Sequelize connection pool configuration
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },

  /** AUTH KEY */
  auth: {
    secret: "our-secret-key1",
  },
};
