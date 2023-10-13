import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},
  current: null,
};

export const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setTeams: (state, action) => {
      const { organizationId, teams } = action.payload;
      state.current = null;
      state.items[organizationId] = teams;
    },

    setCurrentTeam: (state, action) => {
      state.current = action.payload;
    },

    addTeam: (state, action) => {
      const { organizationId, team } = action.payload;
      if (!(organizationId in state.items)) {
        state.items[organizationId] = [team]
      } else {
        state.items[organizationId].push(team);
      }
    },

    clearTeams: (state) => {
      return initialState;
    },
  },
});

export const {
  setTeams,
  setCurrentTeam,
  addTeam,
  clearTeams,
} = teamSlice.actions;

export default teamSlice.reducer;
