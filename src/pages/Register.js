import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from 'store/thunk';

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
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            required
          />

          <input
            type="text"
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Signup</button>
        <Link to="/login">Login</Link>
      </form>
    </>
  );
};
