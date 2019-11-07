import React, {Component} from 'react';
import {updateTwitchProfileId} from '../../Redux/Reducers/AccountSetUpReducer/AccountSetUpReducer';
import {connect} from 'react-redux';

class SetUp extends Component {
    state = {
        error: false
    }

    onClickComplete = e => {
        e.preventDefault();
        const {twitch_profile_id} = this.props;
        this.props.updateTwitchProfileId(
            twitch_profile_id
        ).then(() => {
            this.props.history.push('/user/login');
        }).catch(() => {
            this.setState({ error: true})
        })
    }

    render() {
        return (
            <>
            <div>ENTERTAINMENT SET UP</div>
            <a href="http://localhost:5555/auth/twitch"><button>Log in with Twitch</button></a>
            <h2>Mixer</h2>
            <h2>YouTube</h2>
            <button onClick={this.onClickComplete}>COMPLETE</button>
            </>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        twitch_profile_id: state.accountSetUpReducer.twitch_profile_id,
        // mixer_profile_id: state.reducer.mixer_profile_id,
        // youtube_profile_id: state.reducer.youtube_profile_id
    }
}

export default connect(mapStateToProps, {
    updateTwitchProfileId
})(SetUp);