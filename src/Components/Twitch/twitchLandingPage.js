import React, { Component } from 'react';
import { updateTwitchProfileId } from '../../Redux/Reducers/EntertainmentReducers/twitchReducer';
import { connect } from 'react-redux';
import axios from 'axios';
import './css/twitchLandingPage.css';
require('dotenv').config();

class TwitchLandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            twitch_profile_id: '',
            display_name: '',
            follows: []
        }
    }

    componentDidMount = () => {
        this.props.updateTwitchProfileId().then(response => {
            this.setState({ twitch_profile_id: response.value.data[0].twitch_profile_id }, () => {
                this.getFollows();
            })
        }).catch(error => {
            console.log(error);
        });
    }

    getFollows = () => {
        axios.get(`https://api.twitch.tv/helix/users/follows?from_id=${this.state.twitch_profile_id}&first=100`, {
            headers: {
                "Client-ID": `${process.env.REACT_APP_TWITCH_CLIENT_ID}`
            }
        })
            .then(response => {
                this.setState({ follows: response.data.data })
            })
            .catch(error => {
                console.log(error);
            })
    };

    getStream = (val) => {
        console.log(val);
        axios.get(`https://api.twitch/tv/helix/users?login=${val}`, {
            headers: {
                "Client-ID": `${process.env.REACT_APP_TWITCH_CLIENT_ID}`
            }
        })
            .then(response => {
                console.log(response)
                // this.setState({ display_name: response.data.data[0].display_name })
                this.props.history.push('/user/twitch/stream')
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        console.log(this.state.follows);
        console.log(this.getStream());

        let mappedFollows = this.state.follows.map(val => {
            return (
                <div className='Following_card'>
                    <div className='followed_streamer' onClick={(val) => this.getStream(val)}>{val.to_name}</div>
                </div>
            )
        })
        return (
            <div className='twitch_user_landing_page'>
                <h1>Following</h1>
                <div>{mappedFollows}</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        twitch_profile_id: state.TwitchReducer.twitch_profile_id,
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps, {
    updateTwitchProfileId
})(TwitchLandingPage);