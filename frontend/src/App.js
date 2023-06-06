import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Routing } from './routes';

function App() {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
}

export default App;
