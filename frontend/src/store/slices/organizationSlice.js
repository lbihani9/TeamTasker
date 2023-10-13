import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  current: null,
};

export const organizationSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    setOrganizations: (state, action) => {
      state.current = null;
      state.items = action.payload;
    },

    setCurrentOrganization: (state, action) => {
      state.current = action.payload;
    },

    addOrganization: (state, action) => {
      state.items.push(action.payload);
    },

    clearOrgnizations: (state) => {
      return initialState;
    },
  },
});

export const {
  setOrganizations,
  setCurrentOrganization,
  addOrganization,
  clearOrgnizations,
} = organizationSlice.actions;

export default organizationSlice.reducer;
