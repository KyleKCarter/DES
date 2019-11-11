import React, { Component } from 'react';
import './css/youtubeStreamPage.css';
import { Link } from 'react-router-dom';

class YouTubeStreamPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display_name: this.props.match.params.display_name,
            streamId: this.props.match.params.streamId
        }
    }

    render() {
        const { display_name, streamId } = this.state;
        return (
            <div className='page_content'>
                <div className='link'>
                    <Link to='/user/youtube'><button>{'<'} Back</button></Link>
                    <h1 className='video'>{display_name}</h1>
                </div>
                <div className='video_content'>
                            <iframe title='Stream frame' width="880" height="530" src={`https://www.youtube.com/embed/${streamId}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        )
    }
}

export default YouTubeStreamPage;