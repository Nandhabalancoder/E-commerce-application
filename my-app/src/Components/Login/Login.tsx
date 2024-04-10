import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/authSlice'; // Adjust the path as per your file structure

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state:any) => state.auth.loading);
  const error = useSelector((state:any) => state.auth.error);

  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleInputChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    dispatch(login(formData) as any); // Dispatch the login action with the form data
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
        <button type="submit" disabled={loading}>Login</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;