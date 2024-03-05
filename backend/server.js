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
const expenseController = require("./controllers/expenseController");

app.use(cors());

// middleware to check if the jwt is valid or not
const tokenValidity = require("./middlewares/tokenValidity")
app.use("/api/expense", (req, res, next) => tokenValidity(req, res, next));

app.use("/api//user", userController);
app.use("/api/expense", expenseController);


app.listen(port, () => {
    console.log("The server is running on: http://localhost:" + port);
})