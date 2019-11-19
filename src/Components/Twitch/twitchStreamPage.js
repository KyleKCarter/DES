import React, { Component } from 'react';
import "./css/twitchStreamPage.css";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class TwitchStreamPage extends Component {
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
                    <Link to='/user/twitch'><button className='back_button_twitch'>{'<'}Back</button></Link>
                    <h1 className='twitch_streamer_name'>{this.state.display_name}</h1>
                </div>
                <div className='stream_content'>
                    <iframe title="Streamer's player frame" src={`https://player.twitch.tv/?channel=${display_name}`} frameborder="0" allowfullscreen="true" scrolling="no" height="550" width="790"></iframe>
                    <iframe title="Streamer's chat frame" src={`https://www.twitch.tv/embed/${display_name}/chat`} frameborder="0" scrolling="no" height="550" width="350"></iframe>
                </div>
                {this.props.loggedIn === false && this.props.finishedChecking === "johnstilldumb" ? window.location.href='/user/login' : null }
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

export default connect(mapStateToProps)(TwitchStreamPage);