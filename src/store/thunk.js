import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchContactsSuccess } from './contactSlice';


const instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

const setToken = token => {
  instance.defaults.headers.common['Authorization'] = token;
};
const delToken = () => {
  delete instance.defaults.headers.common['Authorization'];
};

export const signUp = createAsyncThunk(
  'user/register',
  async (user, { rejectWithValue }) => {
    try {
      const response = await instance.post('/users/signup', user);
      setToken(`Bearer ${response.data.token}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'user/login',
  async (user, { rejectWithValue }) => {
    try {
      const response = await instance.post('/users/login', user);
      setToken(`Bearer ${response.data.token}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await instance.post('/users/logout');
      delToken();
      dispatch(logOut())
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const contacts = await instance.get('/contacts');
      return contacts.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async contact => {
    const response = await instance.post('/contacts', contact);
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    await instance.delete(`/contacts/${contactId}`);
    return contactId;
  }
);
