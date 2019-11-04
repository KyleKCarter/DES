import React from 'react';
import {Switch, Route} from 'react-router-dom';

//components
import HomeGuest from './Components/Home/Home_Guest/home';
import HomeUser from './Components/Home/Home_User/home';
import About from './Components/About/about';
import Register from './Components/Login-Register/Register/register';
import Login from './Components/Login-Register/Login/login';
import SetUp from './Components/Accout Set Up/setUp';
import Profile from './Components/Profile/profile';

export default (
    <Switch>
        <Route component={HomeGuest} exact path='/' />
        <Route component={HomeUser} exact path='/user/home' />
        <Route component={About} path='/about' />
        <Route component={Register} path='/user/register'/>
        <Route component={SetUp} path='/user/set-up' />
        <Route component={Login} path='/user/login'/>
        <Route component={Profile} path='/user/profile' />
    </Switch>
)