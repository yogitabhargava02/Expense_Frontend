import MainNavbar from "./components/Layout/MainNavbar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home";

import CreateExpenseForm from "./components/Expenses/CreateExpenseForm";
import EditExpenseForm from "./components/Expenses/EditExpenseForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
export default function App() {
  return (
    
    <Router>
      <MainNavbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/create" element={<CreateExpenseForm />} />
        {/* Update the edit route with a parameter */}
        <Route path="/edit/:expenseId" element={<EditExpenseForm />} />
      </Routes>
    </Router>
 
  );
}
