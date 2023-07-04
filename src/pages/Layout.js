import { Outlet, useNavigate } from "react-router-dom";
import React from 'react'

export const Layout = () => {
    const navigate = useNavigate()
  return (
    <>
      <div>
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/register')}>Register</button>
        <button onClick={() => {navigate('/logout')}}>LogOut</button>
      </div>
      <Outlet />
    </>
  );
};
