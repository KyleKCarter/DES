import React, { Component } from 'react';
import './nav.css';
import { Link, withRouter } from 'react-router-dom';
import { changeNav, logoutUser } from '../../Redux/Reducers/AuthReducer/AuthReducer';
import { connect } from 'react-redux';

//components
import Entertainment from '../Entertainment/entertainment';

class Nav extends Component {
    state = {
        nav: false,
        open: false
    }

    handleLogout = () => {
        this.props.logoutUser().then(() => {
            this.props.history.push('/');
        })
    }

    handleClick = () => {
        this.setState({ open: true })
    }

    render() {
        let entertainmentDropdown = 'entertainment';
        if ( this.state.open === true ) {
            entertainmentDropdown += ' entertainment-open'
        }
        return (
            <div className='navBar'>
                <Link to='/'>
                    <div className='title'>Daily Entertainment Streaming King</div>
                </Link>
                <ul>
                    {!this.props.user.username ?
                        <>
                            <Link to='/'>
                                <li>Home</li>
                            </Link>
                            <div>|</div>
                            <Link to='/about'>
                                <li>About</li>
                            </Link>
                            <div>|</div>
                            <Link to='/user/register'>
                                <li>Register</li>
                            </Link>
                            <div>|</div>
                            <Link to='/user/login'>
                                <li>Login</li>
                            </Link>
                        </>
                        : null
                    }
                    {this.props.user.username ?
                        <>
                            <Link to='/user/home'>
                                <li>Home</li>
                            </Link>
                            <div>|</div>
                            <li className={entertainmentDropdown} onClick={this.handleClick}>Entertainment <Entertainment /> </li>
                            <div>|</div>
                            <Link to='/user/profile'>
                                <li>Profile</li>
                            </Link>
                            <div>|</div>
                            <Link>
                                <li onClick={this.handleLogout}>Logout</li>
                            </Link>
                        </>
                        : null
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        nav: state.authReducer.nav,
        user: state.authReducer.user
    }
}

export default withRouter(connect(mapStateToProps, {
    changeNav,
    logoutUser
})(Nav));