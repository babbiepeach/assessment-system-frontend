import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  assignmentInfo: {},
  classInfo: {},
  classId: '',
  classActiveTab: 'tab1',
  similarityScore: null
};

const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    setAssignmentInfo: (state, { payload }) => {
      state.assignmentInfo = { ...payload };
    },
    setClassInfo: (state, { payload }) => {
      state.classInfo = { ...payload };
    },
    setClassId: (state, { payload }) => {
      state.classId = `${payload}`;
    },
    setClassActiveTab: (state, { payload }) => {
      state.classActiveTab = `${payload}`;
    },
    setSimilarityScore: (state, { payload }) => {
      state.similarityScore = `${payload}`;
    },
    resetStorageSlice: (state, { payload }) => {
      state.assignmentInfo = {};
      state.classInfo = {};
      state.classId = '';
      state.classActiveTab = 'tab1';
      state.similarityScore = null;
    },
  },
});

const { reducer, actions } = storageSlice;

export const {
  setAssignmentInfo,
  setClassInfo,
  setClassId,
  setClassActiveTab,
  setSimilarityScore,
  resetStorageSlice,
} = actions;

export default reducer;
