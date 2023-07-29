import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../helper';
const DeleteExpenseForm = ({ onClose, expenseId }) => {
  const handleDelete = async () => {
    try {
        if (!expenseId) {
            alert("Expense ID is missing");
            return;
          }
      const res = await axios.delete(`${BASE_URL}expenses/delete/${expenseId}`);
      console.log("Server Response Data:", res.data);
      console.log("Server Response Status:", res.status);

      if (res.data.success) {
        alert("Expense deleted successfully");
        onClose(); // Close the delete form or perform any other desired action
      }
    } catch (error) {
      alert("Error during delete: " + error.response?.data?.message);
      console.log(error);
    }
  };

  const handleCancel = () => {
    onClose(); // Close the delete form without deleting the expense
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">Delete Expense</h2>
        <p>Are you sure you want to delete this expense?</p>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            No
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteExpenseForm;
