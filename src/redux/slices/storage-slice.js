import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  classInfo: {},
  classId: '',
};

const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    setClassInfo: (state, { payload }) => {
      state.classInfo = { ...payload };
    },
    setClassId: (state, { payload }) => {
      state.classId = `${payload}`;
    },
    resetStorageSlice: (state, { payload }) => {
      state.classInfo = {};
      state.classId = '';
    },
  },
});

const { reducer, actions } = storageSlice;

export const {
  setClassInfo,
  setClassId,
  resetStorageSlice,
} = actions;

export default reducer;
