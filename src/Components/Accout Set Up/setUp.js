import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SetUp extends Component {

    render() {
        return (
            <>
            <div>ENTERTAINMENT SET UP</div>
            <a href="http://localhost:5555/auth/twitch"><button>Log in with Twitch</button></a>
            <h2>Mixer</h2>
            <h2>YouTube</h2>
            <Link to='/user/login'>
                <button>COMPLETE</button>
            </Link>
            </>
        )
    }
}

export default SetUp;