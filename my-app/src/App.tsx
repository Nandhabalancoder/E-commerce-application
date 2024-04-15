import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar';
import React from 'react';
import SignUpForm from './Components/SignUp/SignUp';
import Admin from './Components/Admin/Admin';
import Cart from './Components/Cart/Cart';
import Footer from './Components/Footer/Footer';





function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpForm page="signup" />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
  

    </div>
  );
}

export default App;