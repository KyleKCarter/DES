import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class SetUp extends Component {
    // state = {
    //     redirectToReferrer: false
    // }

    // login = (data) => {
    //     console.log('Logging in ' + data.username);
    //     fetch('/auth/twitch', {
    //         method:'Get',
    //         body: JSON.stringify(data),
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //     })
    //     .then((response) => {
    //         if (response.status === 200) {
    //             user.authenticate(() => {
    //                 this.setState()
    //             })
    //         }
    //     })
    // }

    render() {
        return (
            <>
            <div>ENTERTAINMENT SET UP</div>
            <h2>Twitch</h2>
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