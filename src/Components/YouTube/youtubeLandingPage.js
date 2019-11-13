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
            username: '',
            subscribed: [],
            video_title: '',
            display_name: '',
            streamId: '',
            channelSection: []
        }
    }

    componentDidMount = () => {
        this.props.updateYoutubeProfileId().then(response => {
            this.setState({ youtube_profile_id: response.value.data[0].youtube_profile_id }, () => {
                this.getSubscibed();
            })
        }).catch(error => {
            console.log(error);
        })
    }

    getSubscibed = () => {
        axios.get(`https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&channelId=${this.state.youtube_profile_id}&maxResults=50&key=${process.env.REACT_APP_API_KEY1}`)
            .then(response => {
                this.setState({
                    subscribed: response.data.items
                })
            })
            .catch(error => {
                console.log(error);
            })
    };

    getChannel = (e, val) => {
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${val}&maxResults=10&order=date&type=video&key=${process.env.REACT_APP_API_KEY3}`)
            .then(response => {
                this.setState({ channelSection: response.data.items })
            })
            .catch(error => {
                console.log(error)
            })
    }

    getVideo = (e, val) => {
        this.props.history.push(`/user/youtube/video/${val}`)
    }

    getStreamId = (e, val) => {
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${val}&eventType=live&type=video&key=${process.env.REACT_APP_API_KEY3}`)
            .then(response => {
                this.setState({
                    streamId: response.data.items[0].id.videoId,
                    display_name: response.data.items[0].snippet.channelTitle
                })
                this.getStream()
            })
    }

    getStream = () => {
        this.props.history.push(`/user/youtube/stream/${this.state.streamId}`)
    }

    render() {

        let mappedSubscribed = this.state.subscribed.map(val => {
            return (
                <div className='Subscribed_card'>
                    <div className='subscribed_creator' onClick={(e) => this.getChannel(e, val.snippet.resourceId.channelId)}>{val.snippet.title}</div>
                </div>
            )
        })
        let mappedChannelVids = this.state.channelSection.map(val => {
            return (
                <div className='channel_section'>
                    <button onClick={(e) => this.getStreamId(e, val.snippet.channelId)}>Watch Stream</button>
                    <img className='video_thumbnail' onClick={(e) => this.getVideo(e, val.id.videoId)} src={`${val.snippet.thumbnails.default.url}`} alt="video_thumbnail" />
                    <div className='video_title' onClick={(e) => this.getVideo(e, val.id.videoId)}>{val.snippet.title}</div>
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
                            <div>
                                <div>{mappedChannelVids}</div>
                            </div>
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