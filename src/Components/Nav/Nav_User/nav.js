import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from '../../../Redux/Reducers/AuthReducer/AuthReducer';

class Nav extends Component {

    handleLogout = () => {
        this.props.logoutUser().then(() => {
            this.props.history.push('/');
        })
    }

    render() {
        console.log(this.props.user);
        return (
            <div>
                <Link to='/user/home'>
                    <div>TITLE/LOGO</div>
                </Link>
                <ul>
                    <Link to='/user/home'>
                    <li>HOME</li>
                    </Link>
                    <div>|</div>
                    <Link to='/about'>
                    <li>ABOUT</li>
                    </Link>
                    <div>|</div>
                    <Link to='/user/profile'>
                    <li>PROFILE</li>
                    </Link>
                    <div>|</div>
                    <li onClick={this.handleLogout}>LOGOUT</li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
    }
}

export default connect(mapStateToProps, {
    logoutUser
})(Nav);