import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  success: false,
  message: '',
  error: false,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setSuccess: (state, { payload }) => {
      state.success = true;
      state.error = false;
      state.message = payload;
    },
    clearSuccess: (state) => {
      state.message = '';
      state.success = false;
    },
    setError: (state, { payload }) => {
      state.error = true;
      state.message = payload;
      state.success = false;
    },
    clearError: (state) => {
      state.error = false;
      state.message = '';
    },
    clearAll: (state) => {
      state.message = '';
      state.success = false;
      state.error = false;
    }
  },
});

const { reducer, actions } = messageSlice;

export const {
  setSuccess, clearSuccess,
  setError, clearError,
  clearAll
} = actions

export default reducer;