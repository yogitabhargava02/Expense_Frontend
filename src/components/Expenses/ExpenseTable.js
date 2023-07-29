



import React, { useState, useEffect } from 'react';
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditExpenseForm from './EditExpenseForm';
import DeleteExpenseForm from './DeleteExpenseForm';
import { BASE_URL } from '../helper';
const ExpenseTable = ({ searchInput,loggedInUser  }) => {
  const [expenseIdToDelete, setExpenseIdToDelete] = useState(null);
  const [expenseData, setExpenseData] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}getAllExpenses`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "expenseData");
        setExpenseData(data.data);
      });
  }, []);

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setShowEditForm(true);
  };

  


 
  const formatCreatedBy = (createdBy, gmail) => {
    if (createdBy === loggedInUser) {
      return "me";
    } else if (gmail) {
      return gmail;
    } else {
      return createdBy || "Unknown User";
    }
  };
  
  
  
  const renderUpdatedAt = (updatedAt) => {
    if (!updatedAt) return "Not available";

    const date = new Date(updatedAt);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    return date.toLocaleDateString("en-GB", options);
  };

  
  

  const formatDate = (dateString) => {
    if (!dateString) return "Not available";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    return date.toLocaleDateString("en-GB", options);
  
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setEditingExpense(null);
  };

  const handleDeleteExpense = (expenseId) => {
    setEditingExpense(null);
    setExpenseIdToDelete(expenseId);
    setShowDeleteForm(true);
  };

  const handleClosedDeleteForm = () => {
    setShowDeleteForm(false);
    setEditingExpense(null);
  };

  const filteredExpensesByName = expenseData.filter((expense) => {
    const expenseName = expense.name.toLowerCase();
    const searchQueryLowerCase = searchQuery.toLowerCase();
    return expenseName.includes(searchQueryLowerCase);
  });

  const filteredAndSortedExpenses = filteredExpensesByName.filter((expense) => {
    if (dateFilter) {
      const selectedDate = new Date(dateFilter);
      const expenseDate = new Date(expense.dateExpense);
      return (
        expenseDate.getFullYear() === selectedDate.getFullYear() &&
        expenseDate.getMonth() === selectedDate.getMonth() &&
        expenseDate.getDate() === selectedDate.getDate()
      );
    }
    return true;
  });

  return (
    <div className="px-4 py-8">
      <div className="flex items-center space-x-4 mb-4">
        <label className="flex items-center text-gray-700">
          <span className="mr-2 font-bold">Search by expense name:</span>
          <div className="relative flex items-center">
            <input
              type="text"
              className="border rounded p-4 pr-10 text-lg font-bold focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-6 w-6 absolute right-3 text-gray-500 pointer-events-none"
  viewBox="0 0 20 20"
  fill="currentColor"
>
  <path
    fillRule="evenodd"
    d="M12.293 13.293l3.353 3.354-1.414 1.414-3.354-3.354a7.5 7.5 0 111.415-1.414zM9.5 15a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"
    clipRule="evenodd"
  />
</svg>

          </div>
        </label>

        <label className="flex items-center text-gray-700">
          <span className="mr-2 font-bold">Filter By Date:</span>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border rounded p-4 text-lg font-bold focus:outline-none"
          />
        </label>
      </div>

      <div className="overflow-x-auto">
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Category Name</th>
            <th className="border p-2">Date of expense</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Updated at</th>
            <th className="border p-2">Created by</th>
            <th className="border p-2"></th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedExpenses.map((expense) => (
            <tr key={expense._id}>
              <td className="border p-2 font-bold text-justify">{expense.name}</td>
              <td className="border p-2">{expense.description}</td>
              <td className="border p-2">{expense.category}</td>
              <td className="border p-2">{formatDate(expense.dateExpense)}</td>
              <td className="border p-2">INR {expense.expenseAmount}</td>
              <td className="border p-2">{renderUpdatedAt(expense.updatedAt)}</td>
              <td className="border p-2">{formatCreatedBy(expense.createdBy, expense.gmail, expense.createdAt, expense.updatedAt)}</td>
              <td className="border p-2">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="cursor-pointer text-blue-500 hover:text-blue-700 mr-2"
                  onClick={() => handleEditExpense(expense)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="cursor-pointer text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteExpense(expense._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


      {showEditForm && (
        <EditExpenseForm
          onClose={handleCloseEditForm}
          expense={editingExpense}
        />
      )}

      {showDeleteForm && (
        <DeleteExpenseForm
          onClose={handleClosedDeleteForm}
          expenseId={expenseIdToDelete}
        />
      )}
    </div>
  );
};

export default ExpenseTable;