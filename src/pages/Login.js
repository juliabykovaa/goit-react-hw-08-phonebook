import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logIn } from 'store/thunk';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Link as ChakraLink,
} from '@chakra-ui/react';


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();


 const handleSubmit = e => {
   e.preventDefault();
   dispatch(
     logIn({
       email,
       password,
     })
   ).then(response => {
     console.log('Login response:', response);
     if (
       response.meta.requestStatus === "fulfilled"
     ) {
       toast.success('Welcome!');
       navigate('/contacts');
     } else {
       toast.error('Please register an account.');
     }
   });
 };
  const handleChange = ({ target: { value, name } }) => {
    name === 'email' ? setEmail(value) : setPassword(value);
  };

  return (
    <Box p={4} maxW="400px" mx="auto">
      <Heading as="h1" mb={4}>
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </FormControl>
        <Stack direction="row" spacing={8} align="center">
          <Button type="submit" colorScheme="blue" mb={4}>
            Log In
          </Button>
          <ChakraLink as={Link} to="/register">
            Sign Up
          </ChakraLink>
        </Stack>
      </form>
    </Box>
  );
};
