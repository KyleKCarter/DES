import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SetUp extends Component {
    render() {
        return (
            <>
            <div>ACCOUNT SET UP</div>
            <h2>Twitch</h2>
            <h2>Mixer</h2>
            <h2>YouTube</h2>
            <Link to='/user/home'>
                <button>COMPLETE</button>
            </Link>
            </>
        )
    }
}

export default SetUp;