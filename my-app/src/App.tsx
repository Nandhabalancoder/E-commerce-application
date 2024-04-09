import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataFailure, fetchDataRequest, fetchDataSuccess } from './redux/Slice';
import axios from 'axios';




function App() {

 
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state:any) => state.data);

  useEffect(() => {
    dispatch(fetchDataRequest());
    axios.get('https://dummyjson.com/products')
      .then(response => dispatch(fetchDataSuccess(response.data)))
      .catch(error => dispatch(fetchDataFailure(error)));
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;