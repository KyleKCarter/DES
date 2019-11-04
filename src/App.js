import React, {Component} from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom';
import routes from './routes';

//components
import NavGuest from './Components/Nav/Nav_Guest/nav';
import NavUser from './Components/Nav/Nav_User/nav';

export default class App extends Component {
  state = {
    nav: false
  }

  render() {
    return (
      <HashRouter>
        <div className="App">
          {this.state.nav === true ? <NavUser /> : this.state.nav === false ? <NavGuest /> : null}
          {routes}
        </div>
      </HashRouter>
    );
  }
}