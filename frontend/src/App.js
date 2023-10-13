import { RouterProvider } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import persistStore from 'redux-persist/es/persistStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './store/store';
import { router } from './routes';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

export const persistor = persistStore(store);

export const clearReduxPersistState = () => {
  persistor.pause();
  persistor.flush().then(() => {
    return persistor.purge();
  });
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <RouterProvider router={router} />
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
