import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import organizationReducer from './slices/organizationSlice';
import tasksReducer from './slices/tasksSlice';
import projectsReducer from './slices/projectsSlice';
import teamReducer from './slices/teamSlice';
import userReducer from './slices/userSlice';

const reducers = combineReducers({
  organizations: organizationReducer,
  tasks: tasksReducer,
  projects: projectsReducer,
  teams: teamReducer,
  auth: userReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
