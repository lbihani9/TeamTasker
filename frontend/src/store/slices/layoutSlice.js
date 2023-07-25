import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  layout: {
    primaryNavbar: {
      xs: 0.5,
      sm: 0.5,
      md: 0.5,
      lg: 0.5,
      xl: 0.5,
    },
    secondaryNavbar: {
      xs: 1.5,
      sm: 1.5,
      md: 1.5,
      lg: 1.5,
      xl: 1.5,
    },
    centerContent: {
      xs: 12,
      sm: 12,
      md: 8,
      lg: 8,
      xl: 8,
    },
    quickActions: {
      xs: 1,
      sm: 1,
      md: 3.5,
      lg: 3.5,
      xl: 3.5,
    },
  },
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLayout: (state, action) => {
      const { isSecondaryNavbarOpen } = action.payload;
      if (!isSecondaryNavbarOpen) {
        state.layout = initialState.layout;
        return;
      }

      state.layout = {
        primaryNavbar: {
          xs: 0.5,
          sm: 0.5,
          md: 0.5,
          lg: 0.5,
          xl: 0.5,
        },
        secondaryNavbar: {
          xs: 1.5,
          sm: 1.5,
          md: 1.5,
          lg: 1.5,
          xl: 1.5,
        },
        centerContent: {
          xs: 12,
          sm: 12,
          md: 8,
          lg: 8,
          xl: 8,
        },
        quickActions: {
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 2,
        },
      };
    },
  },
});

export const { setLayout } = layoutSlice.actions;

export default layoutSlice.reducer;
