import React, { Component } from 'react';
import "./css/mixerStreamPage.css";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class MixerStreamPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display_name: this.props.match.params.display_name
        }
    }

    render() {
        const { display_name } = this.state;
        return (
            <div className='page_content'>
                <div className='fake_nav_bar'></div>
                <div className='link'>
                    <Link to='/user/mixer'><button className='back_button_mixer'>{'<'}Back</button></Link>
                    <h1 className='streamer'>{this.state.display_name}</h1>
                </div>
                <div className='stream_content'>
                    <iframe title="Streamer's player frame" allowfullscreen="true" src={`https://mixer.com/embed/player/${display_name}?disableLowLatency=1`} className='mixer_stream_video_frame' width="790" height="550"> </iframe>
                    <iframe title="Streamer's chat frame" allowfullscreen="true" src={`https://mixer.com/embed/chat/${display_name}`} className='mixer_stream_chat_frame' width="350" height="550"> </iframe>
                </div>
                {this.props.loggedIn === false && this.props.finishedChecking === "johnstilldumb" ? window.location.href = '/user/login' : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.authReducer.loggedIn,
        finishedChecking: state.authReducer.finishedChecking
    }
}

export default connect(mapStateToProps)(MixerStreamPage);