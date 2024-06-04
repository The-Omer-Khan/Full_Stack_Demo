import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/home/home.tsx";
import Login from "./components/login/Login.tsx";
import Signup from "./components/signup/signup.tsx";
import AddProductPage from "./components/product/add.tsx";
import DeleteProducts from "./components/product/delete.tsx";
import Navbar from "./components/nav/index.js";

function App() {
  const isAuthenticated = !!localStorage.getItem("access_token");

  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/add"
            element={
              isAuthenticated ? <AddProductPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/delete"
            element={
              isAuthenticated ? <DeleteProducts /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </Router>
    </>
  );
}
export default App;
