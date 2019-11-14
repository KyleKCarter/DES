import React, { Component } from 'react';
import './login.css';
import { connect } from 'react-redux';
import { updateState, resetFields, loginUser } from '../../../Redux/Reducers/AuthReducer/AuthReducer';

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
            this.props.updateState({loggedIn: true})
            this.props.history.push('/user/home');
        }).catch(() => {
            this.setState({ error: true });
        })
    }

    render() {
        // console.log(this.props.history);
        return (
            <div className='login_body'>
                <div className='login_body_content'>
                    <div className='login_title'>Login</div>
                    <div>
                        <form className='login_form'>
                            <div>Username:</div>
                            <input className='login_input' name='username' onChange={this.handleChange} />
                            <div>Password:</div>
                            <input className='login_input' type='password' name='password' onChange={this.handleChange} />
                        </form>
                        <button onClick={this.clickLogin}>Login</button>
                    </div>
                </div>
                {this.state.error === true ? (
                    <div className='error'>
                        <div className='error_msg'>Wrong username or password</div>
                        <img className='error_img' src="https://66.media.tumblr.com/2feea74041feaa70ca7221ae28065f15/tumblr_ouypl7fXA11w23gl9o1_400.gifv" alt="SLJ_meme" />
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