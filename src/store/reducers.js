import { authReducer } from './authSlice';
import { contactReducer } from './contactSlice';

export const reducer = {
  contact: contactReducer,
  auth: authReducer,
};
