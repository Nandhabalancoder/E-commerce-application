import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar';
import React from 'react';
import SignUpForm from './Components/SignUp/SignUp';





function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;