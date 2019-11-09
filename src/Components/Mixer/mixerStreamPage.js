import React, { Component } from 'react';
import "./css/mixerStreamPage.css";
import { Link } from 'react-router-dom';

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
                <div className='link'>
                    <Link to='/user/mixer'><button>{'<'}Back</button></Link>
                    <h1 className='streamer'>{this.state.display_name}</h1>
                </div>
                <div className='stream_content'>
                    <iframe title="Streamer's player frame" allowfullscreen="true" src={`https://mixer.com/embed/player/${display_name}?disableLowLatency=1`} width="790" height="550"> </iframe>
                    <iframe title="Streamer's chat frame" allowfullscreen="true" src={`https://mixer.com/embed/chat/${display_name}`} width="350" height="550"> </iframe>
                </div>
            </div>
        )
    }
}

export default MixerStreamPage;