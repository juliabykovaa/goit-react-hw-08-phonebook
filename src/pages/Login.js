import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logIn } from 'store/thunk';

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
    ).then(() => {
      toast.success('Welcome!');
      navigate('/contacts');
    });
  };

  const handleChange = ({ target: { value, name } }) => {
    name === 'email' ? setEmail(value) : setPassword(value);
    };
    
    
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
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
              <button type="submit">Login</button>
              <Link to='/register'>Sign up</Link>
      </form>
    </>
  );
};
