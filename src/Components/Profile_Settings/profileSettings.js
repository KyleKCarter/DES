import React, { Component } from 'react';
import './profileSettings.css';
import { updateIMG, updateUsername, updateBio, updateProfileImg, updateProfile, getUserInfo, removeTwitch, removeMixer, removeYoutube } from '../../Redux/Reducers/ProfileReducer/settingsReducer';
import {updateTwitchProfileId, updateMixerProfileId, updateYoutubeProfileId} from '../../Redux/Reducers/AccountSetUpReducer/AccountSetUpReducer'
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

    removeTwitchProfile = async() => {
        const {id} = this.props.user;
        await this.props.removeTwitch(
            id
        )
    }

    removeMixerProfile = async() => {
        const {id} = this.props.user;
        await this.props.removeMixer(
            id
        )
    }

    removeYoutubeProfile = async() => {
        const {id} = this.props.user;
        await this.props.removeYoutube(
            id
        )
    }

    // handleCompleteLink = () => {
    //     const { twitch_profile_id } = this.props;
    //     this.props.updateTwitchProfileId(
    //        twitch_profile_id
    //        )
    //     const { mixer_profile_id} = this.props
    //     this.props.updateMixerProfileId(
    //         mixer_profile_id
    //     )
    //     const { youtube_profile_id } = this.props;
    //     this.props.updateYoutubeProfileId(
    //         youtube_profile_id
    //     )
    //    .then(() => {
    //         this.props.history.push('/user/profile/settings');
    //     }).catch(() => {
    //         this.setState({ error: true })
    //     })
    // }

    accountSetUp = () => {
        this.props.history.push('/user/set-up');
    }

    render() {
        const { img, username, bio } = this.props;
        return (
            <body className='settings_page'>
            <div className='fake_nav_bar'></div>
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
                        <div className='entertainment_settings'>
                            <div>
                                <button className='unlink_twitch_button' onClick={this.removeTwitchProfile}><img className='unlink_twitch_logo' src="https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2019/09/3-twitch-is-rebranding-for-the-first-time.jpg" alt="twitch_logo" />Unlink Twitch Account</button>
                                {/* <a href="http://localhost:5555/auth/twitch/set-up"><button className='link_twitch_logo'><img className='unlink_twitch_logo' src="https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2019/09/3-twitch-is-rebranding-for-the-first-time.jpg" alt="twitch_logo" />Link Twitch</button></a> */}
                                <button className='link_account_button' onClick={this.accountSetUp}>Link Accounts</button>
                            </div>
                            <div>
                                <button className='unlink_mixer_button' onClick={this.removeMixerProfile}><img className='unlink_mixer_logo' src="https://files.startupranking.com/startup/thumb/52553_dae09bc2ebff123b43708bf949cea0cf095281d2_mixer_m.png" alt="mixer_logo" />Unlink Mixer Account</button>
                                {/* <a href="http://localhost:5555/auth/mixer/"><button className='link_mixer_logo'><img className='unlink_mixer_logo' src="https://files.startupranking.com/startup/thumb/52553_dae09bc2ebff123b43708bf949cea0cf095281d2_mixer_m.png" alt="mixer_logo" />Link Mixer</button></a> */}
                            </div>
                            <div>
                                <button className='unlink_youtube_button' onClick={this.removeYoutubeProfile}><img className='unlink_youtube_logo' src="https://www.yachtstarship.com/wp-content/uploads/2016/09/Youtube-Logo-Vector-300x212.png" alt="youtube_logo" />Unlink YouTube Account</button>
                                {/* <a href="http://localhost:5555/auth/youtube/"><button className='link_youtube_logo'><img className='unlink_youtube_logo' src="https://www.yachtstarship.com/wp-content/uploads/2016/09/Youtube-Logo-Vector-300x212.png" alt="youtube_logo" />Link YouTube</button></a> */}
                            </div>
                            {/* <button onClick={this.handleCompleteLink}>Complete</button> */}
                        </div>
                        :
                        null
                }
                {this.props.loggedIn === false && this.props.finishedChecking === "johnstilldumb" ? window.location.href = '/user/login' : null}
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
        userImg: state.settingsReducer.userImg,
        twitch_profile_id: state.accountSetUpReducer.twitch_profile_id,
        mixer_profile_id: state.accountSetUpReducer.mixer_profile_id,
        youtube_profile_id: state.accountSetUpReducer.youtube_profile_id,
        finishedChecking: state.authReducer.finishedChecking
    }
}

export default connect(mapStateToProps, {
    updateIMG,
    updateUsername,
    updateBio,
    updateProfileImg,
    updateProfile,
    getUserInfo,
    removeTwitch,
    removeMixer,
    removeYoutube,
    updateTwitchProfileId,
    updateMixerProfileId,
    updateYoutubeProfileId
})(ProfileSettings);