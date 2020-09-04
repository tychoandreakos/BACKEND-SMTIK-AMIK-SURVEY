const express = require("express");
const app = express();
const port = 8000;
const db = require("./Configuration");
const bodyParser = require("body-parser");

const Router = require("./Router");
db;

app.use([Router, bodyParser.json()]);

app.listen(port, () => console.log(`Connected to port ${port}`));
