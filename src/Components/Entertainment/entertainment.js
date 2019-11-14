import React, { Component } from 'react';
import './entertainment.css';
import { Link } from 'react-router-dom';

class Entertainment extends Component {
    render() {
        return (
            <div>
                <ul className='entertainment_dropdown_menu'>
                    <Link to='/user/twitch'>
                        <li>Twitch</li>
                    </Link>
                    <Link to='/user/mixer'>
                        <li>Mixer</li>
                    </Link>
                    <Link to='/user/youtube'>
                        <li>YouTube</li>
                    </Link>
                </ul>
            </div>
        )
    }
}

export default Entertainment;