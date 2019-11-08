import React from 'react';
import { Switch, Route } from 'react-router-dom';

//components
import App from './App';
import NavGuest from './Components/Nav/nav';
import HomeGuest from './Components/Home/Home_Guest/home';
import HomeUser from './Components/Home/Home_User/home';
import About from './Components/About/about';
import Register from './Components/Login-Register/Register/register';
import Login from './Components/Login-Register/Login/login';
import SetUp from './Components/Accout Set Up/setUp';
import Profile from './Components/Profile/profile';
import Entertainment from './Components/Entertainment/entertainment';
import TwitchPage from './Components/Twitch/twitchLandingPage';
import TwitchStreamPage from './Components/Twitch/twitchStreamPage';

export default (
    <>
    <NavGuest />
    <Switch>
        <Route component={App} exact path='/asdfasdf'/>
        <Route component={HomeGuest} exact path='/' />
        <Route component={About} path='/about' />
        <Route component={HomeUser} exact path='/user/home' />
        <Route component={Register} path='/user/register' />
        <Route component={SetUp} path='/user/set-up' />
        <Route component={Login} path='/user/login' />
        <Route component={Profile} path='/user/profile' />
        <Route component={Entertainment} path='/user/entertainment' />
        <Route component={TwitchPage} exact path='/user/twitch' />
        <Route component={TwitchStreamPage} path='/user/twitch/stream' />
    </Switch>
    </>
)