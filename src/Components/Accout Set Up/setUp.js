import React, { Component } from 'react';
import './setUp.css';
import axios from 'axios';
import { updateTwitchProfileId, updateMixerProfileId, updateGoogleProfileId } from '../../Redux/Reducers/AccountSetUpReducer/AccountSetUpReducer';
import { connect } from 'react-redux';
require('dotenv').config();

class SetUp extends Component {
    state = {
        error: false,
        google_profile_id: this.props.google_profile_id,
        youtube_profile_id: '',
        youtubeProfile_id: ''
    }

    onClickComplete = e => {
        e.preventDefault();
        const { twitch_profile_id } = this.props;
        this.props.updateTwitchProfileId(
           twitch_profile_id
           )
        const { mixer_profile_id} = this.props
        this.props.updateMixerProfileId(
            mixer_profile_id
        )
        const { google_profile_id } = this.props;
        this.props.updateGoogleProfileId(
            google_profile_id
        )
        // const { youtubeProfile_id } = this.state;
        this.addYoutubeProfileId(
            // youtubeProfile_id
        )
       .then(() => {
            this.props.history.push('/user/login');
        }).catch(() => {
            this.setState({ error: true })
        })
    }

    updateYoutubeProfileId = () => {
        axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername=${this.state.google_profile_id}&key=${process.env.REACT_APP_API_KEY3}`)
            .then(response => {
                this.setState({ youtube_profile_id: response.items[0].id})
            })
            .catch(error => {
                console.log(error)
            })
    }

    addYoutubeProfileId = () => {
        axios.post('/api/youtube_profile_id')
            .then(response => {
                this.setState({ youtubeProfile_id: response.data})
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        console.log(this.state.youtube_profile_id);
        return (
            <div className='set-up_page'>
                <div className='page_title'>ENTERTAINMENT SET UP</div>
                <div className='set-up_content'>
                    <a href="http://localhost:5555/auth/twitch"><button>Log in with Twitch</button></a>
                    <a href="http://localhost:5555/auth/mixer"><button>Log in with Mixer</button></a>
                    <a href="http://localhost:5555/auth/google"><button>Log in with YouTube</button></a>
                </div>
                <button onClick={this.onClickComplete}>COMPLETE</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        twitch_profile_id: state.accountSetUpReducer.twitch_profile_id,
        mixer_profile_id: state.accountSetUpReducer.mixer_profile_id,
        google_profile_id: state.accountSetUpReducer.google_profile_id,
        youtube_profile_id: state.accountSetUpReducer.youtube_profile_id
    }
}

export default connect(mapStateToProps, {
    updateTwitchProfileId,
    updateMixerProfileId,
    updateGoogleProfileId
})(SetUp);