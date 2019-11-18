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
        const {youtube_profile_id} = this.state;
        axios.post('/api/youtube_profile_id', {
            youtube_profile_id
        })
    }

    onClickComplete = () => {
        const { twitch_profile_id } = this.props;
        this.props.updateTwitchProfileId(
           twitch_profile_id
           )
        const { mixer_profile_id} = this.props
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
            <div className='set-up_page'>
                <div className='page_title'>ENTERTAINMENT SET UP</div>
                <div className='set-up_content'>
                    <a href="http://localhost:5555/auth/twitch/set-up"><button>Log in with Twitch</button></a>
                    <a href="http://localhost:5555/auth/mixer/"><button>Log in with Mixer</button></a>
                    <a href="http://localhost:5555/auth/youtube/"><button>Log in with YouTube</button></a>
                </div>
                <button onClick={this.onClickComplete}>COMPLETE</button>
                <button onClick={this.setUpLater}>Set up later</button>
                {this.props.loggedIn === false && this.props.finishedChecking === "johnstilldumb" ? window.location.href = '/user/login' : null}
            </div>
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