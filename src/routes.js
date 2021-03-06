import React from 'react';
import { Switch, Route } from 'react-router-dom';

//components
import App from './App';
import Nav from './Components/Nav/nav';
import HomeGuest from './Components/Home/Home_Guest/home';
import HomeUser from './Components/Home/Home_User/home';
import About from './Components/About/about';
import Register from './Components/Login-Register/Register/register';
import Login from './Components/Login-Register/Login/login';
import SetUp from './Components/Accout Set Up/setUp';
import Profile from './Components/Profile/profile';
import TwitchPage from './Components/Twitch/twitchLandingPage';
import TwitchStreamPage from './Components/Twitch/twitchStreamPage';
import MixerPage from './Components/Mixer/mixerLandingPage';
import MixerStreamPage from './Components/Mixer/mixerStreamPage';
import YoutubePage from './Components/YouTube/youtubeLandingPage';
import YoutubeVideoPage from './Components/YouTube/youtubeVideoPage';
import YoutubeStreamPage from './Components/YouTube/youtubeStreamPage';
import ReviewsLandingPage from './Components/Reviews/reviewsLandingPage';
import ReviewPostPage from './Components/Reviews/reviewsPostPage';
import ProfileSettings from './Components/Profile_Settings/profileSettings';

export default (
    <>
    <Nav />
    <Switch>
        <Route component={App} exact path='/asdfasdf'/>
        <Route component={HomeGuest} exact path='/' />
        <Route component={About} path='/about' />
        <Route component={HomeUser} exact path='/user/home' />
        <Route component={Register} path='/user/register' />
        <Route component={SetUp} path='/user/set-up' />
        <Route component={Login} path='/user/login' />
        <Route component={Profile} exact path='/user/profile' />
        <Route component={TwitchPage} exact path='/user/twitch' />
        <Route component={TwitchStreamPage} path='/user/twitch/stream/:display_name' />
        <Route component={MixerPage} exact path='/user/mixer' />
        <Route component={MixerStreamPage} path='/user/mixer/stream/:display_name' />
        <Route component={YoutubePage} exact path='/user/youtube' />
        <Route component={YoutubeVideoPage} path='/user/youtube/video/:videoId' />
        <Route component={YoutubeStreamPage} path='/user/youtube/stream/:streamId' />
        <Route component={ReviewPostPage} path='/user/reviews/post' />
        <Route component={ReviewsLandingPage} path='/user/reviews/:entertainment' />
        <Route component={ProfileSettings} path='/user/profile/settings' />
    </Switch>
    </>
)