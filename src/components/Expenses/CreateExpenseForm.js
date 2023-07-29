import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../helper";
const CreateExpenseForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [dateExpense, setDateExpense] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const handleCancel = () => {
    onClose(); // Close the modal or perform any other desired action for canceling
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}create`, {
        name,
        description,
        category,
        dateExpense: new Date(dateExpense).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),

        expenseAmount
      });

      console.log("Server Response Data:", res.data);
      console.log("Server Response Status:", res.status);

      if (res.data.success) {
        alert("Expense created successfully");
        // Close the modal or perform any other desired action
      }
    } catch (error) {
      alert("Error during save: " + error.response?.data?.message);
      console.log(error);
    }
  };

  
  return (
    <div className="overlay">
      <div className="Address__Box">
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Create New Expense</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="block">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block">Description</label>
              <input
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block">Category</label>
              <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              >
                <option value="Housing">Housing</option>
                <option value="Transportation">Transportation</option>
                <option value="Food">Food</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Travel">Travel</option>
                <option value="Education">Education</option>
                <option value="DebtPayments">Debt Payments</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block">Date of Expense</label>
              <input
                type="date"
                name="dateExpense"
                value={dateExpense}
                onChange={(e) => setDateExpense(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block">Expense Amount</label>
              <input
                type="number"
                name="expenseAmount"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Expense
            </button>
            <button
  type="button"
  onClick={handleCancel} 
  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
>
  Cancel
</button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateExpenseForm;
