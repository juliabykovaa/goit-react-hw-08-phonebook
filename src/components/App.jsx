import Contacts from 'pages/Contacts';
import Homepage from 'pages/HomePage';
import { Layout } from 'pages/Layout';

import { Login } from 'pages/Login';
import { Register } from 'pages/Register';
import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { fetchContacts } from 'store/thunk';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {isLoggedIn && <Route path="/contacts" element={<Contacts />} />}
        </Route>
      </Routes>
    </>
  );
}

export default App;
