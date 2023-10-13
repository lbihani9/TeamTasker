import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {
    team: {},
    private: {},
  },
  current: null,
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setTeamProjects: (state, action) => {
      const { teamId, projects } = action.payload;
      state.items.team[teamId] = projects;
    },

    // This is for private projects only. Private here means, any project that is outside the organization context.
    setProjects: (state, action) => {
      const { userId, projects } = action.payload;
      state.items.private[userId] = projects;
    },

    setCurrentProject: (state, action) => {
      state.current = action.payload;
    },

    addTeamProject: (state, action) => {
      const { teamId, project } = action.payload;
      state.items.team[teamId].push(project);
    },

    addProject: (state, action) => {
      const { userId, project } = action.payload;
      state.items.private[userId].push(project);
    },

    updateTeamStoreProject: (state, action) => {
      const { teamId, project } = action.payload;
      state.items.team[teamId] = state.items.team[teamId].map((item) =>
        item.id === project?.id ? project : item
      );
    },

    updateStoreProject: (state, action) => {
      const { userId, project } = action.payload;
      state.items.private[userId] = state.items.private[userId].map((item) =>
        item.id === project?.id ? project : item
      );
    },

    clearProjects: (state) => {
      return initialState;
    },
  },
});

export const {
  setProjects,
  addProject,
  clearProjects,
  updateStoreProject,
  setCurrentProject,
  updateTeamStoreProject,
  addTeamProject,
  setTeamProjects,
} = projectsSlice.actions;

export default projectsSlice.reducer;
