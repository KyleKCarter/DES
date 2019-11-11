import React, { Component } from 'react';
import { updateYoutubeProfileId } from '../../Redux/Reducers/EntertainmentReducers/youtubeReducer';
import { connect } from 'react-redux';
import axios from 'axios';
import './css/youtubeLandingPage.css';
require('dotenv').config();

class YoutubeLandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            youtube_profile_id: '',
            ChannelId: process.env.REACT_APP_PERSONAL_YOUTUBE_CHANNEL_ID,
            username: '',
            subscribed: [],
            video_title: '',
            videoId: '',
            channelSection: []
        }
    }

    componentDidMount = () => {
        this.getSubscibed();
        // this.props.updateYoutubeProfileId().then(response => {
        //     this.setState({ youtube_profile_id: response.value.data[0].youtube_profile_id }, () => {
        //         this.getSubscibed();
        //     })
        // }).catch(error => {
        //     console.log(error);
        // })
    }

    getSubscibed = () => {
        axios.get(`https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&channelId=${this.state.ChannelId}&maxResults=50&key=${process.env.REACT_APP_API_KEY1}`)
            .then(response => {
                this.setState({ subscribed: response.data.items })
            })
            .catch(error => {
                console.log(error);
            })
    };

    getChannel = (e, val) => {
        axios.get(`https://www.googleapis.com/youtube/v3/channelSections?part=snippet&channelId=${val}=${process.env.REACT_APP_API_KEY2}`)
            .then(response => {
                console.log(response)
                // this.setState({ channelSection: response.data.items[0].snippet})
            })
            .catch(error => {
                console.log(error)
            })
    }

    getVideo = (e, val) => {
        e.preventDefault();
        this.setState({ 
            video_title: val.title,
            videoId: val.id
         })
        this.props.history.push(`/user/youtube/video/${val}`)
    }

    render() {
        console.log(this.state.channelSection);

        let mappedSubscribed = this.state.subscribed.map(val => {
            return (
                <div className='Subscribed_card'>
                    <div className='subscribed_creator' onClick={(e) => this.getChannel(e, val.snippet.resourceId.channelId)}>{val.snippet.title}</div>
                </div>
            )
        })
        let mappedChannelVids = this.state.channelSection.map(val => {
            console.log(val);
            return (
                <div className='channel_section'>
                    <div className='videos' onClick={(e) => this.getVideo(e, val.items[0])}>{val.title}</div>
                </div>
            )
        })
        return (
            <div className='youtube_user_landing_page'>
                <div className='subscribed_section'>
                    <h1>Subscribed</h1>
                    <div>{mappedSubscribed}</div>
                </div>
                <div>
                    {
                            this.state.channelSection
                        ?
                            <div>{mappedChannelVids}</div>
                        :
                            null
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        youtube_profile_id: state.youtubeReducer.youtube_profile_id,
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps, {
    updateYoutubeProfileId
})(YoutubeLandingPage)