import './App.css';
import Router from './navigators/Router';
import { BrowserRouter } from 'react-router-dom'; 
import {MainProvider} from './context/MainContext';

function App() {
  return (
    <div className="App">
      <MainProvider>
        <BrowserRouter>
          <Router/>
        </BrowserRouter>
      </MainProvider>
    </div>
  );
}

export default App;
