const {Schema, default: mongoose} = require("mongoose");

let ExpenseDetailSchema = new Schema({
    expenseDetailId: {type: String, required: true},
    name: {type: String, default: ""},
    categories: {type: [String], default: []},
    amount: {type: Number, default: 0},
    date: {type: Number, default: 0}, // this will UTC milliseconds time
    comment: {type: String, default: ""}
});

let ExpenseSchema = new Schema({
    partitionKey: {type: String, required: true, index: true},
    emoji: {type: String, required: true},
    month: {type: String, required: true},
    year: {type: String, required: true},
    categories: {type: [String], default: []},
    expenses: {type: [ExpenseDetailSchema], default: []}
});


mongoose.model("Expense", ExpenseSchema);