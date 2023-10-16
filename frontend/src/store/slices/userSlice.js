import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: {},
  isLoggedIn: false,
  metadata: {},
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.info = action.payload;
    },

    updateMetadata: (state, action) => {
      const { key, val } = action.payload;
      state.metadata = { ...state.metadata, [key]: val };
    },

    removeFromMetadata: (state, action) => {
      const { key } = action.payload;
      const prev = { ...state.metadata };

      delete prev[key];
      state.metadata = prev;
    },

    setLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },

    clearInfo: (state) => {
      state.info = {};
      state.isLoggedIn = false;
    },
  },
});

export const {
  setUserInfo,
  clearInfo,
  updateMetadata,
  removeFromMetadata,
  setLoginStatus,
} = userSlice.actions;

export default userSlice.reducer;
