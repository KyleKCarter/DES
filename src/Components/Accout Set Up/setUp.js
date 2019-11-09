import React, { Component } from 'react';
import './setUp.css';
import { updateTwitchProfileId, updateMixerProfileId } from '../../Redux/Reducers/AccountSetUpReducer/AccountSetUpReducer';
import { connect } from 'react-redux';

class SetUp extends Component {
    state = {
        error: false
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
       .then(() => {
            this.props.history.push('/user/login');
        }).catch(() => {
            this.setState({ error: true })
        })
    }

    // addMixerProfileId = () => {
    //     const { mixer_profile_id } = this.props;
    //     this.props.updateMixerProfileId(
    //         mixer_profile_id
    //     )
    // }

    render() {
        return (
            <div className='set-up_page'>
                <div className='page_title'>ENTERTAINMENT SET UP</div>
                <div className='set-up_content'>
                    <a href="http://localhost:5555/auth/twitch"><button>Log in with Twitch</button></a>
                    <a href="http://localhost:5555/auth/mixer"><button>Log in with Mixer</button></a>
                    <button>Log in with YouTube</button>
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
        // youtube_profile_id: state.reducer.youtube_profile_id
    }
}

export default connect(mapStateToProps, {
    updateTwitchProfileId,
    updateMixerProfileId,
})(SetUp);