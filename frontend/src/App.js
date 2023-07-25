import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Routing } from './routes';
import axios from 'axios';
import persistStore from 'redux-persist/es/persistStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './store/store';

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
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
