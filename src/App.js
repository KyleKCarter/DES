import React from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom';
import routes from './routes';

//components
import NavGuest from './Components/Nav/Nav_Guest/nav';
import NavUser from './Components/Nav/Nav_User/nav';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <NavGuest />
        {routes}
      </div>
    </HashRouter>
  );
}

export default App;
