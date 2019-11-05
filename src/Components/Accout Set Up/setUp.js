import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class SetUp extends Component {

    render() {
        return (
            <>
            <div>ACCOUNT SET UP</div>
            <h2>Twitch</h2>
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