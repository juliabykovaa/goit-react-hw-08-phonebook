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
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  const isLogged = useSelector(state => state.auth.isLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogged) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isLogged]);

  return (
    <>
      <ChakraProvider>
        <Toaster />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/contacts" element={<Contacts />} />
          </Route>
        </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;
