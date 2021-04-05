const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const Router = require("./Router");

//configration, didn't need initialization to varibable
require("./Configuration");

var corsOptions = {
  origin: process.env.CLIENT,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: process.env.LIMIT_TRANSFER }));
app.use(express.static("public"));
app.use(process.env.API_PATH, Router);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Connected to port ${process.env.PORT}`)
);
