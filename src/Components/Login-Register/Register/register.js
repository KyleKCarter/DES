import React, {Component} from 'react';
import './register.css';
import {resetFields, updateState, registerUser} from '../../../Redux/Reducers/AuthReducer/AuthReducer';
import {connect} from 'react-redux';

class Register extends Component {
    state = {
        error: false
    }

    clickGoBack = () => {
        this.props.resetFields();
        this.props.history.push('/');
    };

    handleChange = e => [
        this.props.updateState({ [e.target.name]: e.target.value })
    ];

    handleRegister = e => {
        e.preventDefault();
        const {firstname, lastname, email, username, password} = this.props;
        this.props.registerUser(
            firstname,
            lastname,
            email,
            username,
            password
        ).then(() => {
            this.props.history.push('/user/set-up');
        }).catch(() => {
            this.setState({ error: true });
        })
    }

    render() {
        return (
            <div className='register_body'>
                <div className='register_title'>Register</div>
                <div>
                    <form className='register_form' type='submit'>
                        <div>First Name:</div>
                        <input className='register_input' name='firstname' onChange={this.handleChange} />
                        <div>Last Name:</div>
                        <input className='register_input' name='lastname' onChange={this.handleChange} />
                        <div>Email:</div>
                        <input className='register_input' name='email' onChange={this.handleChange} />
                        <div>Username:</div>
                        <input className='register_input' name='username' onChange={this.handleChange} />
                        <div>Password:</div>
                        <input className='register_input' type="password" name='password' onChange={this.handleChange} />
                    </form>
                        <button onClick={this.handleRegister}>Register</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        firstname: state.authReducer.firstname,
        lastname: state.authReducer.lastname,
        email: state.authReducer.email,
        username: state.authReducer.username,
        password: state.authReducer.password
    }
}

export default connect(mapStateToProps, {
    updateState,
    resetFields,
    registerUser
})(Register);