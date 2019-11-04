import React, {Component} from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom';
import routes from './routes';
import { connect } from 'react-redux';

//reducers
import {changeNav, logoutUser} from './Redux/Reducers/AuthReducer/AuthReducer';

class App extends Component {
  state = {
    nav: false
  }

  render() {
    console.log(this.props.nav);
    console.log(this.props.history);
    return (
      <HashRouter>
        <div className="App">
          {routes}
        </div>
      </HashRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    nav: state.authReducer.nav
  }
}

export default connect(mapStateToProps, {
  changeNav,
  logoutUser
})(App);