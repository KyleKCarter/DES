import React, { Component } from 'react';
import './about.css';

class About extends Component {
    render() {
        return (
            <div className='about_content'>
                <div className='description'>
                    <p className='text_description'>
                        Do you enjoy changing between entertainment services in a short period of time? Getting tired of it? Well
                        look no further, DESK is here to help.
                    </p>
                    <p className='text_description_middle'>
                        Daily Entertainment Streaming King is a one of a kind streaming service that allows users to navigate to and from their favorite entertainment with ease.
                    </p>
                    <p className='text_description'>
                        DESK was designed to make watching entertainment stressfree, easy, and fun. Plus the best
                        part is you will have all your favorite entertainment services all on your desk...hassle free!
                    </p>
                </div>
                <div className='streams'>
                    <iframe title="Tim's player frame" src="https://player.twitch.tv/?channel=timthetatman" frameborder="0" allowfullscreen="true" scrolling="no" height="300" width="540"></iframe>
                    <iframe title="Ninja's player frame" allowfullscreen="true" src="https://mixer.com/embed/player/Ninja?disableLowLatency=1" width="540" height="300"> </iframe>
                </div>
            </div>
        )
    }
}

export default About;