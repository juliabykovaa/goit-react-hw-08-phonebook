import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box, Text } from '@chakra-ui/react';

import { logingOut, toggleContactBookVisibility } from 'store/authSlice';

export const Layout = () => {
  const navigate = useNavigate();
  const isLogged = useSelector(state => state.auth.auth.isLogged);
  const userName = useSelector(state => state.auth.auth.user.email);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logingOut());
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleOpenContactBook = () => {
    dispatch(toggleContactBookVisibility());
    navigate('/contacts');
  };

  return (
    <>
      <Box p={4}>
        {isLogged ? (
          <Box display="flex" alignItems="center" >
            <Text mr={8}>{userName}</Text>
            <Button onClick={handleLogout} colorScheme="red" variant="outline">
              Log Out
            </Button>
            {location.pathname !== '/contacts' && (
              <Button onClick={handleOpenContactBook} ml={4}>
                Open Contact Book
              </Button>
            )}
          </Box>
        ) : (
          <>
            <Button onClick={() => navigate('/login')} mr={4}>
              Log In
            </Button>
            <Button onClick={() => navigate('/signup')} mr={4}>
              Sign Up
            </Button>
          </>
        )}
      </Box>
      <Outlet />
    </>
  );
};
