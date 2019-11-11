import React, { Component } from 'react';
import './css/youtubeVideoPage.css';
import { Link } from 'react-router-dom';

class YouTubeVideoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video_title: this.props.match.params.video_title,
            videoId: this.props.match.params.videoId
        }
    }



    render() {

        return (
            <div className='page_content'>
                <div className='link'>
                    <Link to='/user/youtube'><button>{'<'} Back</button></Link>
                    <h1 className='video'>{this.state.video_title}</h1>
                </div>
                <div className='video_content'>
                    <iframe title='Video frame' src={`https://www.youtube.com/embed/${this.state.videoId}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen='true' width="880" height="550"></iframe>
                </div>
            </div>
        )
    }
}

export default YouTubeVideoPage;