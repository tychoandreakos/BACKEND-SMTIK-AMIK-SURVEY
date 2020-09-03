const express = require("express");
const app = express();
const port = 8000;

const Router = require("./Router");

app.use([Router]);

app.listen(port, () => console.log(`Connected to port ${port}`));
