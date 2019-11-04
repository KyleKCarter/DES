import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateState, resetFields, loginUser} from '../../../Redux/Reducers/AuthReducer/AuthReducer';

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
            this.props.history.push('/user/home');
        }).catch(() => {
            this.setState({ error: true });
        })
    }

    render() {
        // console.log(this.props.history);
        return (
            <div>
                <div>Login</div>
                <div>
                    <form className='login_form'>
                        <div>Username:</div>
                        <input className='login_input' name='username' onChange={this.handleChange} />
                        <div>Password:</div>
                        <input className='login_input' type='password' name='password' onChange={this.handleChange} />
                    </form>
                        <button onClick={this.clickLogin}>Login</button>
                </div>
                {this.state.error === true ? (<div>**Wrong username or password**</div>) : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.authReducer.username,
        password: state.authReducer.password
    }
}

export default connect(mapStateToProps, {
    updateState,
    resetFields,
    loginUser
})(Login);