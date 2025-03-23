import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  classInfo: {},
  classId: '',
  classActiveTab: 'tab1',
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
    setClassActiveTab: (state, { payload }) => {
      state.classActiveTab = `${payload}`;
    },
    resetStorageSlice: (state, { payload }) => {
      state.classInfo = {};
      state.classId = '';
      state.classActiveTab = 'tab1';
    },
  },
});

const { reducer, actions } = storageSlice;

export const {
  setClassInfo,
  setClassId,
  setClassActiveTab,
  resetStorageSlice,
} = actions;

export default reducer;
