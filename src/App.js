import React, {Component} from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom';
import routes from './routes';
import { connect } from 'react-redux';

//reducers
import {changeNav} from './Redux/Reducers/AuthReducer/AuthReducer';

//components
import NavGuest from './Components/Nav/Nav_Guest/nav';
import NavUser from './Components/Nav/Nav_User/nav';

class App extends Component {
  state = {
    nav: false
  }

  render() {
    console.log(this.props.nav);
    return (
      <HashRouter>
        <div className="App">
          {this.props.nav === true ? <NavUser /> : this.props.nav === false ? <NavGuest /> : null}
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
  changeNav
})(App);