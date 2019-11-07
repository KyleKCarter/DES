import React, {Component} from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';
import { connect } from 'react-redux';

//reducers
import {changeNav, logoutUser} from './Redux/Reducers/AuthReducer/AuthReducer';

class App extends Component {
  state = {
    nav: false
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {routes}
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    nav: state.authReducer.nav,
    user: state.authReducer.user
  }
}

export default connect(mapStateToProps, {
  changeNav,
  logoutUser
})(App);