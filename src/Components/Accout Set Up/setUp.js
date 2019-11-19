import React, { Component } from 'react';
import './setUp.css';
import axios from 'axios';
import { updateTwitchProfileId, updateMixerProfileId, updateYoutubeProfileId } from '../../Redux/Reducers/AccountSetUpReducer/AccountSetUpReducer';
import { connect } from 'react-redux';
require('dotenv').config();

class SetUp extends Component {
    state = {
        error: false
    }

    addYoutubeProfileId = () => {
        const { youtube_profile_id } = this.state;
        axios.post('/api/youtube_profile_id', {
            youtube_profile_id
        })
    }

    onClickComplete = () => {
        const { twitch_profile_id } = this.props;
        this.props.updateTwitchProfileId(
            twitch_profile_id
        )
        const { mixer_profile_id } = this.props
        this.props.updateMixerProfileId(
            mixer_profile_id
        )
        const { youtube_profile_id } = this.props;
        this.props.updateYoutubeProfileId(
            youtube_profile_id
        )
            .then(() => {
                this.props.history.push('/user/home');
            }).catch(() => {
                this.setState({ error: true })
            })
    }

    setUpLater = () => {
        this.props.history.push('/user/home')
    }

    render() {
        // console.log(this.props.loggedIn)
        return (
            <>
                <div className='fake_nav_bar'></div>
                <div className='set-up_page'>
                    <div className='page_title'>ENTERTAINMENT SET UP</div>
                    <div className='set-up_content'>
                        <a href="http://localhost:5555/auth/twitch/set-up"><button className='log_in_to_twitch'><img className='unlink_twitch_logo' src="https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2019/09/3-twitch-is-rebranding-for-the-first-time.jpg" alt="twitch_logo" />Log in with Twitch</button></a>
                        <a href="http://localhost:5555/auth/mixer/"><button className='log_in_to_mixer'><img className='unlink_mixer_logo' src="https://files.startupranking.com/startup/thumb/52553_dae09bc2ebff123b43708bf949cea0cf095281d2_mixer_m.png" alt="mixer_logo" />Log in with Mixer</button></a>
                        <a href="http://localhost:5555/auth/youtube/"><button className='log_in_to_youtube'><img className='unlink_youtube_logo' src="https://www.yachtstarship.com/wp-content/uploads/2016/09/Youtube-Logo-Vector-300x212.png" alt="youtube_logo" />Log in with YouTube</button></a>
                    </div>
                    <div className='bottom_button_section'>
                        <button className='complete_button' onClick={this.onClickComplete}>COMPLETE</button>
                        <button className='set_up_later' onClick={this.setUpLater}>Set up later</button>
                    </div>
                    {/* {this.props.loggedIn === false && this.props.finishedChecking === "johnstilldumb" ? window.location.href = '/user/login' : null} */}
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.authReducer.loggedIn,
        twitch_profile_id: state.accountSetUpReducer.twitch_profile_id,
        mixer_profile_id: state.accountSetUpReducer.mixer_profile_id,
        youtube_profile_id: state.accountSetUpReducer.youtube_profile_id,
        finishedChecking: state.authReducer.finishedChecking
    }
}

export default connect(mapStateToProps, {
    updateTwitchProfileId,
    updateMixerProfileId,
    updateYoutubeProfileId
})(SetUp);