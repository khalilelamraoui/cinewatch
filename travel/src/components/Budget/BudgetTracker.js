import React, { useState } from 'react';

const BudgetTracker = ({ itinerary }) => {
    const [expenses, setExpenses] = useState([]);

    const addExpense = (description, amount) => {
        setExpenses([...expenses, { description, amount }]);
    };

    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    return (
        <div>
            <h2>Budget Tracker</h2>
            <ul>
                {expenses.map((expense, index) => (
                    <li key={index}>
                        {expense.description}: ${expense.amount}
                    </li>
                ))}
            </ul>
            <p>Total: ${total}</p>
            <button onClick={() => addExpense(prompt('Description'), parseFloat(prompt('Amount')))}>
                Add Expense
            </button>
        </div>
    );
};

export default BudgetTracker;
