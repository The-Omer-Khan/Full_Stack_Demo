import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/home/home.tsx';
import Login from './components/login/Login.tsx';
import Signup from './components/signup/signup.tsx';
import AddProductPage from './components/product/add.tsx';
import ProtectedData from './ProtectedData';
import DeleteProducts from './components/product/delete.tsx';

function App() {
  const isAuthenticated = !!localStorage.getItem('access_token');
  
  return (
    <Router>
      <Routes>
        {/* Set the default route to the homepage */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Use the Route component to conditionally render based on authentication status */}
        <Route path="/add" element={isAuthenticated ? <AddProductPage /> : <Navigate to="/login" />} />
        <Route path="/delete" element={isAuthenticated ? <DeleteProducts /> : <Navigate to="/login" />} />

      </Routes>
    </Router>
  );
}
export default App;