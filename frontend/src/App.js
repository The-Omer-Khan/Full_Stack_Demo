import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/home/home.tsx';
import Login from './components/login/Login.tsx';
import Signup from './components/signup/signup.tsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Set the default route to the homepage */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}
export default App;