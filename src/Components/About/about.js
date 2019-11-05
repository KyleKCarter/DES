import React, {Component} from 'react';
import './about.css';

class About extends Component {
    render() {
        return (
            <div className='about_content'>
                <div className='description'>
                    <p>
                        Section about what the site is.
                    </p>
                </div>
                <div className='streams'>
                <iframe title="Tim's player frame" src="https://player.twitch.tv/?channel=hitchariide" frameborder="0" allowfullscreen="true" scrolling="no" height="300" width="540"></iframe>
                <iframe title="Ninja's player frame" allowfullscreen="true" src="https://mixer.com/embed/player/Ninja?disableLowLatency=1" width="540" height="300"> </iframe>
                </div>
            </div>
        )
    }
}

export default About;