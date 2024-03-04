const express = require("express");
const{v4: uuidv4} = require("uuid");
const mongoose = require("mongoose");

var router = express.Router();

const Expense = mongoose.model("Expense");
const User = mongoose.model("User");

// checks if the expense already exists
router.post("/expense-exists", async (req, res) => {
    const user = await User.findOne({userName: req.user.userName});
    if(!user) {
        return res.status(401).json({message: "User not found!"});
    }

    const newExpense = new Expense();

    const{year, month} = req.body;

    if(!year || !month) {
        return res.status(400).json({message: "Bad Request!"});
    }

    newExpense.partitionKey = `${user.userName}-${year}-${month}`;

    const expense = await Expense.findOne({partitionKey: newExpense.partitionKey});

    if(expense) {
        return res.status(200).json(true);
    }
    return res.status(200).json(false);
});

// creates a new expense if it does not exist
router.post("/create", async (req, res) => {
    const user = await User.findOne({userName: req.user.userName});
    if(!user) {
        return res.status(401).json({message: "User not found!"});
    }

    const newExpense = new Expense();

    const{year, month} = req.body;

    if(!year || !month) {
        return res.status(400).json({message: "Bad Request!"});
    }

    newExpense.partitionKey = `${user.userName}-${year}-${month}`;

    await newExpense.save();
    return res.status(200).json(newExpense);
});

// returns expenses for a particular year/month
router.get("/get", async (req, res) => {
    const user = await User.findOne({userName: req.user.userName});
    if(!user) {
        return res.status(401).json({message: "User not found!"});
    }

    const{year, month} = req.query;

    if(!year || !month) {
        return res.status(400).json({message: "Bad Request!"});
    }

    let partitionKey = `${user.userName}-${year}-${month}`;

    const expense = await Expense.findOne({partitionKey});

    return res.status(200).json(expense);
})

module.exports = router;