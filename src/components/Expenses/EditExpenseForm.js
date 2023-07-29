import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../helper";
const EditExpenseForm = ({ onClose, expense }) => {
  // Check if 'expense' prop is defined, otherwise provide an empty object as default value
  const initialExpense = expense || {};
  const [name, setName] = useState(initialExpense.name || "");
  const [description, setDescription] = useState(initialExpense.description || "");
  const [category, setCategory] = useState(initialExpense.category || "");
  const [dateExpense, setDateExpense] = useState(initialExpense.dateExpense || "");
  const [expenseAmount, setExpenseAmount] = useState(initialExpense.expenseAmount || "");

  const handleCancel = () => {
    onClose(); // Close the modal or perform any other desired action for canceling
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`${BASE_URL}expenses/update/${expense._id}`, {
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
        alert("Expense updated successfully");
        onClose(); // Close the modal or perform any other desired action
      }
    } catch (error) {
      alert("Error during update: " + error.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <div className="overlay">
      <div className="Address__Box">
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Edit Expense</h2>
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
                {/* Options for categories (add your specific categories here) */}
                <option value="Housing">Housing</option>
                <option value="Transportation">Transportation</option>
                {/* Add other categories here */}
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
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Update
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

export default EditExpenseForm;
