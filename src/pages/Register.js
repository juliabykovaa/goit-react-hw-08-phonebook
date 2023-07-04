import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from 'store/thunk';
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


export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      signUp({
        name,
        email,
        password,
      })
    ).then(() => {
        toast.success('You successfully signed up!')
        navigate('/login')
    });
  };

  const handleChange = ({ target: { value, name } }) => {
    name === 'email'
      ? setEmail(value)
      : name === 'password'
      ? setPassword(value)
      : setName(value);
  };
  return (
    <Box p={4} maxW="400px" mx="auto">
      <Heading as="h1" mb={4}>
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </FormControl>
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
          Sign Up
        </Button>
        <ChakraLink as={Link} to="/login">
          Log In
          </ChakraLink>
        </Stack>
      </form>
    </Box>
  );
};
