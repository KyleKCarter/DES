import React, {Component} from 'react';
import './about.css';

class About extends Component {
    render() {
        return (
            <div className='about_content'>
                <div className='description'>
                    <p className='text_description'>
                       Do you enjoy flipping between many entertainment services in a short period of time? Ever get tired of having to do so? Well
                       look no further, DESK is here to help.
                    </p>
                    <p className='text_description'>
                        Daily Entertainment Streaming King is a one of a kind streaming service that allows users to navigate to and from their favorite entertainment with ease.
                        A user will start their journey by registering and selecting the entertainment they would like to view.
                    </p>
                    <p className='text_description'>
                        DESK was designed to make watching entertainment stressfree, easy, and fun. Plus the best 
                        part is that you will have all of your favorite entertainment services all on your desk...hassle free!
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