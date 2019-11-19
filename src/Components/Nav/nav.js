import React, { Component } from 'react';
import './nav.css';
import { Link, withRouter } from 'react-router-dom';
import { changeNav, logoutUser } from '../../Redux/Reducers/AuthReducer/AuthReducer';
import { connect } from 'react-redux';

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
        this.setState({ open: !this.state.open })
    }

    render() {
        let entertainmentDropdown = 'entertainment';
        if (this.state.open === true) {
            entertainmentDropdown += ' entertainment-open'
        }
        // <Entertainment />
        return (
            <div className='navBar'>
                <Link to='/'>
                    <div className='title'>Daily Entertainment Streaming King</div>
                </Link>
                <ul className='parent_ul'>
                    {!this.props.user.username ?
                        <>
                            <Link to='/'>
                                <li>Home</li>
                            </Link>
                            {/* <div>|</div>
                            <Link to='/about'>
                                <li>About</li>
                            </Link> */}
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
                            <button className='entertainment_button' onClick={this.handleClick}>Entertainment</button>
                            <ul className={entertainmentDropdown}>
                                <div className='entertainment_drop_down_menu'>
                                    <Link to='/user/twitch'>
                                        <button onClick={this.handleClick}>Twitch</button>
                                    </Link>
                                    <Link to='/user/mixer'>
                                        <button onClick={this.handleClick}>Mixer</button>
                                    </Link>
                                    <Link to='/user/youtube'>
                                        <button onClick={this.handleClick}>YouTube</button>
                                    </Link>
                                </div>
                            </ul>
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
                    {this.props.loggedIn === false && this.props.finishedChecking === "johnstilldumb" ? window.location.href='/user/login' : null }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        nav: state.authReducer.nav,
        user: state.authReducer.user,
        loggedIn: state.authReducer.loggedIn,
        finishedChecking: state.authReducer.finishedChecking
    }
}

export default withRouter(connect(mapStateToProps, {
    changeNav,
    logoutUser
})(Nav));