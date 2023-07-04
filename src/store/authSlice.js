import { createSlice } from '@reduxjs/toolkit';
import { logIn, signUp } from './thunk';

const initialAuthState = {
  auth: {
    user: { name: '', email: '' },
    accessToken: localStorage.getItem('token') || '',
    isLogged: !!localStorage.getItem('token'),
    error: '',
    isContactBookVisible: false,
  },
};

const handlePending = state => {
  state.auth.error = '';
};

const handleRejected = (state, { error, payload }) => {
  state.auth.error = error ? error.message : payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    logingOut: state => {
      state.auth.accessToken = '';
      state.auth.isLogged = false;
    },
    toggleContactBookVisibility: state => {
      state.isContactBookVisible = !state.true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.auth.user = payload.user;
        state.auth.accessToken = payload.token;
        state.auth.isLogged = false;
      })
      .addCase(logIn.fulfilled, (state, { payload, dispatch }) => {
        state.auth.user = payload.user;
        state.auth.accessToken = payload.token;
        state.auth.isLogged = true;
      })
      .addMatcher(({ type }) => type.endsWith('/pending'), handlePending)
      .addMatcher(({ type }) => type.endsWith('/rejected'), handleRejected);
  },
});

export const authReducer = authSlice.reducer;
export const { logingOut, toggleContactBookVisibility, setUserRegistered } =
  authSlice.actions;
