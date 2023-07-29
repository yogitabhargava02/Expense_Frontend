import React, { useState, useEffect } from "react";
import "../assets/css/Home.css";

import CreateExpenseForm from "./Expenses/CreateExpenseForm";
import ExpenseTable from "./Expenses/ExpenseTable";
import { useLocation } from 'react-router-dom';
import { BASE_URL } from "./helper";

export default function Home() {
  const [NewExpense, setNewExpense] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(""); // Add loggedInUser state

  const location = useLocation();
  const userEmail = location.state?.loggedInUser || '';
  
  useEffect(() => {
    // Fetch the expense data and set it in the state
    fetch(`${BASE_URL}getAllExpenses`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "expenseData");
        setExpenseData(data.data);
      });

    // Set the loggedInUser state with the logged-in user's email
    setLoggedInUser(userEmail);
  }, [userEmail]);

  const handleCreateNewExpense = () => {
    setNewExpense(true);
  };

  const handleCloseModal = () => {
    setNewExpense(false);
  };

  return (
    <>
      <div className="skyblue-background"> 
        <div className="mt-8 flex justify-end space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            onClick={handleCreateNewExpense}
          >
            Create New Expense
          </button>
        </div>
      </div>

      {NewExpense && <CreateExpenseForm onClose={handleCloseModal} />}
      <ExpenseTable
        expenseData={expenseData}
        loggedInUser={loggedInUser} 
      />
    </>
  );
}
