import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { addContact, deleteContact, fetchContacts } from './thunk';

const handlePending = state => {
  state.contacts.isLoading = true;
  state.contacts.error = '';
};

const handleRejected = (state, { payload }) => {
  state.contacts.isLoading = false;
  state.contacts.error = payload;
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.items = [...payload];
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.items.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.contacts.items = state.contacts.items.filter(
          contact => contact.id !== payload
        );
      })
      .addMatcher(action => {
        action.type.endsWith('/pending');
      }, handlePending)
      .addMatcher(action => {
        action.type.endsWith('/rejected');
      }, handleRejected);
  },
});

export const contactReducer = contactSlice.reducer;
export const { setFilter } = contactSlice.actions;
