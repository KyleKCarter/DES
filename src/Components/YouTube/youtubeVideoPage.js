import React, { Component } from 'react';
import './css/youtubeVideoPage.css';
import { Link } from 'react-router-dom';

class YouTubeVideoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video_title: ''
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

                </div>
            </div>
        )
    }
}

export default YouTubeVideoPage;