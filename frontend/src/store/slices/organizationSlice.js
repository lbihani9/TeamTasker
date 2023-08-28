import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  organizations: [],
  currentOrganization: null,
};

export const organizationSlice = createSlice({
  name: 'my-organizations',
  initialState,
  reducers: {
    setMyOrganizations: (state, action) => {
      state.currentOrganization = null;
      state.organizations = action.payload;
    },

    setCurrentOrganization: (state, action) => {
      state.currentOrganization = action.payload;
    },
  },
});

export const {
  setMyOrganizations,
  setCurrentOrganization,
} = organizationSlice.actions;

export default organizationSlice.reducer;
