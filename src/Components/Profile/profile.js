import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Profile extends Component {
    render() {
        return (
            <div>
                <div className='profile_header'>
                    <h1>{this.props.username}</h1>
                    <Link to='/user/profile/settings'><button>Account Settings</button></Link>
                </div>
                {/* {this.props.loggedIn === false ? window.location.href = '/user/login' : null} */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // loggedIn: state.authReducer.loggedIn,
        username: state.authReducer.username
    }
}

export default connect(mapStateToProps)(Profile);