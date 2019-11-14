import React, { Component } from 'react';
import { updateMixerProfileId } from '../../Redux/Reducers/EntertainmentReducers/mixerReducer';
import { connect } from 'react-redux';
import axios from 'axios';
import './css/mixerLandingPage.css';
require('dotenv').config();

class MixerLandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mixer_profile_id: '',
            display_name: '',
            follows: []
        }
    }

    componentDidMount = () => {
        this.props.updateMixerProfileId().then(response => {
            this.setState({ mixer_profile_id: response.value.data[0].mixer_profile_id }, () => {
                this.getFollows();
            })
        }).catch(error => {
            console.log(error);
        });
    }

    getFollows = () => {
        axios.get(`https://mixer.com/api/v1/users/${this.state.mixer_profile_id}/follows`)
            .then(response => {
                this.setState({ follows: response.data })
            })
            .catch(error => {
                console.log(error);
            })
    }

    getStream = (e, val) => {
        e.preventDefault();
        this.props.history.push(`/user/mixer/stream/${val}`)
    }

    getReviews = e => {
        e.preventDefault();
        this.props.history.push(`/user/reviews/Mixer`)
    }

    render() {
        let mappedFollows = this.state.follows.map(val => {
            return (
                <div className='following_card'>
                    <div className='followed_streamer' onClick={(e) => this.getStream(e, val.user.username)}>{val.user.username}</div>
                </div>
            )
        })
        return (
            <div className='mixer_user_landing_page'>
                <div className='mixer_header'>
                    <h1 className='following'>Following</h1>
                    <button className='mixer_reviews_button' onClick={e => this.getReviews(e)}>Reviews</button>
                </div>
                <div>{mappedFollows}</div>
                {this.props.loggedIn === false ? window.location.href='/user/login' : null }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mixer_profile_id: state.mixerReducer.mixer_profile_id,
        user: state.authReducer.user,
        loggedIn: state.authReducer.loggedIn
    }
}

export default connect(mapStateToProps, {
    updateMixerProfileId
})(MixerLandingPage);