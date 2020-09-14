const express = require("express");
const app = express();
const port = 8000;
const db = require("./Configuration");
const bodyParser = require("body-parser");
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const Router = require("./Router");
db;

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(express.static("public"));
app.use("/api", Router);

app.listen(port, () => console.log(`Connected to port ${port}`));
