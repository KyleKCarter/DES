import React, {Component} from 'react';
import './nav.css';
import {Link, withRouter} from 'react-router-dom';
import {changeNav, logoutUser} from '../../Redux/Reducers/AuthReducer/AuthReducer';
import {connect} from 'react-redux';

class Nav extends Component {
    state = {
        nav: false,
    }

    handleLogout = () => {
        this.props.logoutUser().then(() => {
            console.log("hit")
            this.props.history.push('/');
        })
    }

    render() {
        console.log(this.props)
        return (
            <div className='navBar'>
                <Link to='/'>
                    <div className='title'>Daily Entertainment</div>
                </Link>
                <ul>
                    <Link to='/'>
                        <li>HOME</li>
                    </Link>
                    <div>|</div>
                    <Link to='/about'>
                        <li>ABOUT</li>
                    </Link>
                    { this.props.user.username ?
                    <> 
                    <div>|</div>
                    <Link to='/user/entertainment'>
                        <li>ENTERTAINMENT</li>
                    </Link>
                    <div>|</div>
                    <Link to='/user/profile'>
                        <li>PROFILE</li>
                    </Link>
                    <div>|</div>
                    <Link>
                        <li onClick={this.handleLogout}>LOGOUT</li>
                    </Link>
                    </>
                    : null
                    }
                    <div>|</div>
                    <Link to='/user/register'>
                        <li>REGISTER</li>
                    </Link>
                    <div>|</div>
                    <Link to='/user/login'>
                        <li>LOGIN</li>
                    </Link>
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