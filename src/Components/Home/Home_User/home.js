import React, { Component } from 'react';
import './home.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <>
            <div className='fake_nav_bar'></div>
            <div className='user_home_page'>
                <div className='user_home_content'>
                    <Link to='/user/twitch'>
                        <img className='twitch_logo' src="https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2019/09/3-twitch-is-rebranding-for-the-first-time.jpg" alt="twitch_logo"/>
                    </Link>
                    <Link to='/user/mixer'>
                        <img className='mixer_logo' src="https://files.startupranking.com/startup/thumb/52553_dae09bc2ebff123b43708bf949cea0cf095281d2_mixer_m.png" alt="mixer_logo"/>
                    </Link>
                    <Link to='/user/youtube'>
                        <img className='youtube_logo' src="https://www.versionmuseum.com/images/websites/youtube-website/youtube-website%5E2017%5Eyoutube-logo-redesign-cropped.jpg" alt="youtube_logo"/>
                    </Link>
                </div>
                {this.props.loggedIn === false && this.props.finishedChecking === "johnstilldumb" ? window.location.href='/user/login' : null }
            </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.authReducer.loggedIn,
        finishedChecking: state.authReducer.finishedChecking
    }
}

export default connect(mapStateToProps)(Home);