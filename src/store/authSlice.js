import { createSlice } from '@reduxjs/toolkit';
import {  logIn,  signUp } from './thunk';

const initialState = {
  auth: {
    user: { nickname: '', email: '' },

    accessToken: '',
    isLoading: false,
    isLogged: false,
    error: '',
  },
};

const handlePending = state => {
  state.isLoading = true;
  state.error = '';
};

const handleRejected = (state, { error, payload }) => {
  state.isLoading = false;
  state.error = error ? error.message : payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
    reducers: {
        logOut: (state) => {
            state.auth.accessToken = '';
            state.auth.isLogged = false;
            state.auth.isLoading = false;
        }
  },
  extraReducers: builder => {
    builder
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.auth.user = payload.user;
        state.auth.accessToken = payload.token;
        state.auth.isLogged = true;
      })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.auth.accessToken = payload.token;
        state.auth.isLogged = true;
        state.auth.isLoading = false;
      })
      

      .addMatcher(({ type }) => type.endsWith('/pending'), handlePending)
      .addMatcher(({ type }) => type.endsWith('/rejected'), handleRejected);
  },
});

export const authReducer = authSlice.reducer;
export const {logOut} = authSlice.actions
