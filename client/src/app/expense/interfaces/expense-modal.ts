interface ExpenseDetail {
    expenseDetailId: string;
    name: string;
    categories: string[];
    amount: number;
    date: number; // UTC milliseconds time
    comment: string;
}

export interface Expense {
    emoji: string;
    month: string;
    year: string;
    expenses: ExpenseDetail[];
}