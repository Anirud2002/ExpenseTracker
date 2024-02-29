require("./models/db");
const express = require('express');
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3000;


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

const userController = require("./controllers/userController");

app.use(cors());


app.listen(port, () => {
    console.log("The server is running on: http://localhost:" + port);
})