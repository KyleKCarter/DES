import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';
import { connect } from 'react-redux';

//reducers
import { changeNav, logoutUser, getLoggedInStatus } from './Redux/Reducers/AuthReducer/AuthReducer';

class App extends Component {
  state = {
    nav: false
  }
  componentDidMount() {
    this.props.getLoggedInStatus();
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
    user: state.authReducer.user,
    loggedIn: state.authReducer.loggedIn
  }
}

export default connect(mapStateToProps, {
  changeNav,
  logoutUser,
  getLoggedInStatus
})(App);