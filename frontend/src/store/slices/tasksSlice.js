import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {
    project: {},
    other: {},
  },
  current: null,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setProjectTasks: (state, action) => {
      const { projectId, tasks } = action.payload;
      state.items.project[projectId] = [...tasks];
    },

    setTasks: (state, action) => {
      const { userId, tasks } = action.payload;
      state.items.other[userId] = [...tasks];
    },

    addProjectTask: (state, action) => {
      const { projectId, task } = action.payload;
      state.items.project[projectId] = [
        ...state.items.project[projectId],
        { ...task },
      ];
    },

    addTask: (state, action) => {
      const { userId, task } = action.payload;
      state.items.other[userId] = [...state.items.other[userId], { ...task }];
    },

    clearTasks: (state) => {
      return initialState;
    },

    setCurrentTask: (state, action) => {
      state.current = { ...action.payload };
    },

    updateCurrentTask: (state, action) => {
      state.current = {
        ...state.current,
        ...action.payload,
      };
    },

    addCurrentTaskLabel: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.current.labels.push(...action.payload);
      } else {
        state.current.labels.push(action.payload);
      }
    },

    removeCurrentTaskLabel: (state, action) => {
      const { labels } = state.current;

      if (Array.isArray(action.payload)) {
        state.current = {
          ...state.current,
          labels: labels.filter((l) => !action.payload.inclues(l.id)),
        };
      } else {
        state.current = {
          ...state.current,
          labels: labels.filter((l) => l.id !== action.payload),
        };
      }
    },
  },
});

export const {
  setTasks,
  clearTasks,
  addTask,
  setCurrentTask,
  updateCurrentTask,
  removeCurrentTaskLabel,
  addCurrentTaskLabel,
  setProjectTasks,
  addProjectTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
