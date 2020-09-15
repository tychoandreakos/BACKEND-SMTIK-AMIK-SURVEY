/**
 * Connecting the database
 * FULL URL EXPLANATION: https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/
 */
let mongoose = require("mongoose");
require("dotenv").config();

// const uri =
//   "mongodb+srv://danieka12:Elangindra12@survey-amik.cudnc.mongodb.net/survey-stmik-amik?retryWrites=true&w=majority";

const server = process.env.DB_HOST;
const database = process.env.DB_NAME;
const localUri = `${process.env.DB_URI}${server}/${database}`;

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

  //   async _connect() {
  //     try {
  //       const connect = await mongoose.connect(uri);
  //       console.log("Successfully Connected");
  //       return await connect;
  //     } catch {
  //       console.log("Database connection Error");
  //     }
  //   }
}

module.exports = new Database();
