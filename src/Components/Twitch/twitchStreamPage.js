import React, { Component } from 'react';
import "./css/twitchStreamPage.css";
import { Link } from 'react-router-dom';

class TwitchStreamPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display_name: 'DrDisrespect'
        }
    }

    render() {
        const { display_name } = this.state;
        return (
            <div className='page_content'>
                <div className='link'>
                    <Link to='/user/twitch'><button>{'<'}Back</button></Link>
                    <h1 className='streamer'>{this.state.display_name}</h1>
                </div>
                <div className='stream_content'>
                    <iframe title="Streamer's player frame" src={`https://player.twitch.tv/?channel=${display_name}`} frameborder="0" allowfullscreen="true" scrolling="no" height="550" width="790"></iframe>
                    <iframe title="Streamer's chat frame" src={`https://www.twitch.tv/embed/${display_name}/chat`} frameborder="0" scrolling="no" height="550" width="350"></iframe>
                </div>
            </div>
        )
    }
}

export default TwitchStreamPage;