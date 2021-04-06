/**
 * Connecting the database
 * FULL URL EXPLANATION: https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/
 */
let mongoose = require("mongoose");

const server = process.env.DB_HOST;
const database = process.env.DB_NAME;
const localUri = `mongodb://${server}/${database}`;

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(localUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.log(err);
        console.error("Database connection error");
      });
  }
}


module.exports = new Database();
