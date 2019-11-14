import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Profile extends Component {
    render() {
        return (
            <div>
                <div>Profile</div>
                <Link to='/user/set-up'><button>Entertainment Settings</button></Link>
                {this.props.loggedIn === false ? window.location.href='/user/login' : null }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.authReducer.loggedIn
    }
}

export default connect(mapStateToProps)(Profile);