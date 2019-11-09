import React, { Component } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className='user_home_page'>
                <div className='user_home_content'>
                    <Link to='/user/twitch'>
                        <div className='user_home_twitch'>Twitch</div>
                    </Link>
                    <Link to='/user/mixer'>
                        <div className='user_home_mixer'>Mixer</div>
                    </Link>
                    <Link>
                        <div className='user_home_youtube'>YouTube</div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Home;