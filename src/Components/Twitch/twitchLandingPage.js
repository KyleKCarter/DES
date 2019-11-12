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

    getStream = (e, val) => {
        e.preventDefault();
        this.props.history.push(`/user/twitch/stream/${val}`)
    }

    getReviews = e => {
        e.preventDefault();
        this.props.history.push(`/user/reviews/Twitch`)
    }

    render() {
        let mappedFollows = this.state.follows.map(val => {
            return (
                <div className='Following_card'>
                    <div className='followed_streamer' onClick={(e) => this.getStream(e, val.to_name)}>{val.to_name}</div>
                </div>
            )
        })
        return (
            <div className='twitch_user_landing_page'>
                <div className='twitch_header'>
                    <h1 className='following'>Following</h1>
                    <button className='twitch_reviews_button' onClick={e => this.getReviews(e)}>Reviews</button>
                </div>
                <div className='cardSection'>{mappedFollows}</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        twitch_profile_id: state.twitchReducer.twitch_profile_id,
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps, {
    updateTwitchProfileId
})(TwitchLandingPage);