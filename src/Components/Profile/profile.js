import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Profile extends Component {
    render() {
        return(
            <>
            <div>Profile</div>
            <Link to='/user/set-up'><button>Entertainment Settings</button></Link>
            </>
        )
    }
}

export default Profile;