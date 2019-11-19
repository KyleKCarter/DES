import React, { Component } from 'react';
import './css/youtubeVideoPage.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class YouTubeVideoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video_title: this.props.match.params.video_title,
            videoId: this.props.match.params.videoId,
        }
    }



    render() {
        const {videoId, video_title} = this.state
        return (
            <>
            <div className='fake_nav_bar'></div>
            <div className='page_content_youtube'>
                <div className='link'>
                    <Link to='/user/youtube'><button className='back_button_youtube'>{'<'} Back</button></Link>
                    <h1 className='video_title'>{video_title}</h1>
                </div>
                <div className='video_content'>
                    <iframe title='Video frame' src={`https://www.youtube.com/embed/${videoId}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen='true' width="880" height="530"></iframe>
                </div>
                {this.props.loggedIn === false && this.props.finishedChecking === "johnstilldumb" ? window.location.href='/user/login' : null }
            </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.authReducer.loggedIn,
        finishedChecking: state.authReducer.finishedChecking
    }
}

export default connect(mapStateToProps)(YouTubeVideoPage);