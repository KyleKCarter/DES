import React, { Component } from 'react';
import './register.css';
import { resetFields, updateState, registerUser, loginUser } from '../../../Redux/Reducers/AuthReducer/AuthReducer';
import { connect } from 'react-redux';
import axios from 'axios';
import DESK from '../../../Images/DESK.jpg';

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

    handleRegister = async (e) => {
        e.preventDefault();
        const { firstname, lastname, email, username, password } = this.props;
        await this.props.registerUser(
            firstname,
            lastname,
            email,
            username,
            password
        ).then(() => {
            this.props.loginUser(this.props.username, this.props.password)
            this.props.updateState({ loggedIn: true })
        }).catch(() => {
            this.setState({ error: true });
        })
        await axios({
            method: "POST",
            url: "http://localhost:5555/send",
            data: {
                name: firstname,
                email: email
            }
        }).then(response => {
            if (response.data.msg === 'success') {
                alert('Message Sent.');
            } else if(response.data.msg === 'fail'){
                alert('Message failed to send.')
            }
        }).catch(error => {
            console.log(error);
        })
        this.props.history.push('/user/set-up');
        console.log("here");
    }

    render() {
        return (
            <div className='register_body'>
                <div className='fake_nav_bar'></div>
                <div className='register_body_content'>
                <img className='desk_logo_signup' src={DESK} alt="logo" />
                    <div className='sign_up_section'>
                        <form className='register_form' type='submit'>
                            <div>
                                <div className='register_description'>First Name:</div>
                                <input className='register_input' name='firstname' onChange={this.handleChange} />
                            </div>
                            <div>
                                <div className='register_description'>Last Name:</div>
                                <input className='register_input' name='lastname' onChange={this.handleChange} />
                            </div>
                            <div>
                                <div className='register_description'>Email:</div>
                                <input className='register_input' name='email' onChange={this.handleChange} />
                            </div>
                            <div>
                                <div className='register_description'>Username:</div>
                                <input className='register_input' name='username' onChange={this.handleChange} />
                            </div>
                            <div>
                                <div className='register_description'>Password:</div>
                                <input className='register_input' type="password" name='password' onChange={this.handleChange} />
                            </div>
                        </form>
                        <div className='register_button_area'>
                            <button className='register_button' onClick={this.handleRegister}>Register</button>
                        </div>
                    </div>
                </div>
                {this.state.error === true ? (
                    <div className='error'>
                        <img className='error_img' src="https://thumbs.gfycat.com/AmazingLazyGentoopenguin-size_restricted.gif" alt="nein_meme" />
                        <div className='error_msg'>Das nutzername is already in use</div>
                    </div>
                ) : null}
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
        password: state.authReducer.password,
        loggedIn: state.authReducer.loggedIn
    }
}

export default connect(mapStateToProps, {
    updateState,
    resetFields,
    registerUser,
    loginUser
})(Register);