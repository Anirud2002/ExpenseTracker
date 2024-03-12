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

    const{year, month, emoji} = req.body;

    if(!year || !month) {
        return res.status(400).json({message: "Bad Request!"});
    }

    newExpense.partitionKey = `${user.userName}-${year}-${month}`;
    newExpense.month = month;
    newExpense.year = year;
    newExpense.emoji = emoji;

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
});

router.put("/update", async (req, res) => {
    const user = await User.findOne({userName: req.user.userName});
    if(!user) {
        return res.status(401).json({message: "User not found!"});
    }

    const{year, month, emoji, expenses} = req.body;

    let partitionKey = `${user.userName}-${year}-${month}`;

    const expense = await Expense.findOne({partitionKey});

    expense.emoji = emoji;
    expense.expenses = expenses;

    await expense.save();
    return res.status(200).json(expense);
});

// ADD YEAR

router.post("/add/year", async (req, res) => {
    const user = await User.findOne({userName: req.user.userName});
    if(!user) {
        return res.status(401).json({message: "User not found!"});
    }

    const yearExists = user.years.find(year => year === req.body.year);
    if(yearExists) {
        return res.status(500).json({message: `${req.body.year} aleady exists!`});
    }

    user.years.push(req.body.year);

    await user.save();

    return res.status(201).json(req.body.year);
});

// GET YEARS

router.get("/years", async (req, res) => {
    const user = await User.findOne({userName: req.user.userName});
    if(!user) {
        return res.status(401).json({message: "User not found!"});
    }

    return res.status(201).json(user.years);
});




module.exports = router;