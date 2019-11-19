import React, { Component } from 'react';
import './login.css';
import { connect } from 'react-redux';
import { updateState, resetFields, loginUser } from '../../../Redux/Reducers/AuthReducer/AuthReducer';
import { Link } from 'react-router-dom';
import DESK from '../../../Images/DESK.jpg';
import DESK2 from '../../../Images/DESK2.jpg';

class Login extends Component {
    state = {
        error: false
    }

    handleChange = e => {
        this.props.updateState({ [e.target.name]: e.target.value })
    }

    clickLogin = e => {
        e.preventDefault();
        this.props.loginUser(this.props.username, this.props.password).then(() => {
            this.props.updateState({ loggedIn: true })
            this.props.history.push('/user/home');
        }).catch(() => {
            this.setState({ error: true });
        })
    }

    render() {
        // console.log(this.props.history);
        return (
            <div className='login_body'>
                <div className='fake_nav_bar'></div>
                <img className='desk_logo_login' src={DESK} alt="logo" />
                <div className='login_body_content'>
                    <div>
                        <form className='login_form'>
                            <div>Username</div>
                            <input className='login_input' placeholder='Username' name='username' onChange={this.handleChange} />
                            <div>Password</div>
                            <input className='login_input' placeholder='Password' type='password' name='password' onChange={this.handleChange} />
                        </form>
                        <button className='login_button' onClick={this.clickLogin}>LOGIN</button>
                        <div className='register_link_in_login'>
                            <p>New to DESK?</p>
                            <Link to='/user/register'><div>Sign up</div></Link>
                        </div>
                    </div>
                </div>
                <div className='under_login'>
                    <div className='logo_plus_text'>
                        <img className='login_desk_logo' src={DESK2} alt="logo_DESK2"/>
                        <p>account</p>
                    </div>
                    <p>With this account, you can access all features available in Daily Entertainment Streaming King.</p>
                </div>
                {this.state.error === true ? (
                    <div className='error'>
                        <div className='error_msg'>Wrong username or password</div>
                        <img className='error_img' src="https://i.kym-cdn.com/photos/images/newsfeed/000/715/685/8a9.gif" alt="SLJ_meme" />
                    </div>
                ) : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.authReducer.username,
        password: state.authReducer.password,
        loggedIn: state.authReducer.loggedIn
    }
}

export default connect(mapStateToProps, {
    updateState,
    resetFields,
    loginUser
})(Login);