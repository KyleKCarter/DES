import React, { Component } from 'react';
import './profileSettings.css';
import { updateIMG, updateUsername, updateBio, updateProfileImg, updateProfile, getUserInfo } from '../../Redux/Reducers/ProfileReducer/settingsReducer';
import { connect } from 'react-redux';

class ProfileSettings extends Component {
    state = {
        settingsView: 'profile',
        imageSettings: false,
    }

    componentDidMount() {
        const {id} = this.props.user;
        this.props.getUserInfo(id);
    }

    goBackToProfile = () => {
        this.props.history.goBack();
    }

    profileSettings = () => {
        this.setState({ settingsView: 'profile' })
    }

    entertainmentSettings = () => {
        this.setState({ settingsView: 'entertainment' })
    }

    imageUpdate = () => {
        this.setState({ imageSettings: true })
    }

    updateImg = e => {
        this.props.updateIMG({ [e.target.name]: e.target.value })
    }

    updateUserUsername = e => {
        e.preventDefault();
        this.props.updateUsername({ [e.target.name]: e.target.value })
    }

    updateUserBio = e => {
        e.preventDefault();
        this.props.updateBio({ [e.target.name]: e.target.value })
    }

    updateUserImg = () => {
        const {img} = this.props;
        const{id} = this.props.user;
        this.props.updateProfileImg(
            id,
            img
        )
        this.setState({ imageSettings: false })
        this.props.history.push('/user/profile/');
    }

    updateUserProfile = async() => {
        const { username, bio } = this.props;
        const { id } = this.props.user;
        await this.props.updateProfile(
            id,
            username,
            bio
        )
        await this.props.history.push('/user/profile/');
    }

    render() {
        const { img, username, bio } = this.props;
        return (
            <body className='settings_page'>
                <div className='settings_header'>
                    <h1 className='settings_title'>Settings</h1>
                    <h3 className='settings_cancel_button' onClick={this.goBackToProfile}>Cancel</h3>
                </div>
                <div className='settings_menu'>
                    <h4 onClick={this.profileSettings}>Profile</h4>
                    <h4 onClick={this.entertainmentSettings}>Entertainment</h4>
                </div>
                {
                    this.state.settingsView === 'profile'
                        ?
                        <>
                            <h3 className='profile_section_title'>Profile Picture</h3>
                            <div className='profile_picture_section'>
                                <img className='profile_picture_settings' src={this.props.userImg} alt="profile_pic" />
                                <div className='profile_picture_update_button_area'>
                                    <button className='profile_picture_update_button' onClick={this.imageUpdate}>Update Profile Picture</button>
                                    <h5 className='profile_picture_update_text'>Must be an image url</h5>
                                </div>
                                {
                                    this.state.imageSettings === true
                                        ?
                                        <div className='profile_picture_update_input_area'>
                                            <input type="text" onChange={this.updateImg} name="img" value={img} />
                                            <div className='image_submit' onClick={() => this.updateUserImg(this.props.user.user_id)}>Submit</div>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                            <h3 className='profile_section_title'>Profile Settings</h3>
                            <div className='profile_settings_section'>
                                <div className='username_section'>
                                    <h4>Username</h4>
                                    <div className='username_input_field_section'>
                                        <input className='username_edit_input' type="text" onChange={this.updateUserUsername} name="username" value={username} />
                                        <p>You may update your username</p>
                                    </div>
                                </div>
                                <div className='bio_section'>
                                    <h4>Bio</h4>
                                    <div className='text_box_area'>
                                        <textarea className='text_box_input' onChange={this.updateUserBio} name="bio" value={bio} cols="30" rows="10"></textarea>
                                        <p>Who you are in less than 300 characters</p>
                                    </div>
                                </div>
                                <div className='button_section'>
                                    <button onClick={() => this.updateUserProfile(this.props.user.user_id)} className='save_changes_button'>Save Changes</button>
                                </div>
                            </div>
                        </>
                        :
                        null
                }
                {
                    this.state.settingsView === 'entertainment'
                        ?
                        <>
                            <div>
                                <h1>Twitch</h1>
                                <button>Unlink Twitch Account</button>
                            </div>
                            <div>
                                <h1>Mixer</h1>
                                <button>Unlink Mixer Account</button>
                            </div>
                            <div>
                                <h1>YouTube</h1>
                                <button>Unlink YouTube Account</button>
                            </div>
                        </>
                        :
                        null
                }
                {this.props.loggedIn === false ? window.location.href = '/user/login' : null}
            </body>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.authReducer.loggedIn,
        img: state.settingsReducer.img,
        username: state.settingsReducer.username,
        bio: state.settingsReducer.bio,
        user: state.authReducer.user,
        userImg: state.settingsReducer.userImg
    }
}

export default connect(mapStateToProps, {
    updateIMG,
    updateUsername,
    updateBio,
    updateProfileImg,
    updateProfile,
    getUserInfo
})(ProfileSettings);