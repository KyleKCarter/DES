import React, {Component} from 'react';
import './nav.css';
import {Link} from 'react-router-dom';

// import AuthReducer from '../../../Redux/Reducers/AuthReducer/AuthReducer';

class Nav extends Component {
    render() {
        return (
            <div className='navBar'>
                <Link to='/'>
                    <div className='title'>Daily Entertainment</div>
                </Link>
                <ul>
                    <Link to='/'>
                        <li>HOME</li>
                    </Link>
                    <div>|</div>
                    <Link to='/about'>
                        <li>ABOUT</li>
                    </Link>
                    <div>|</div>
                    <Link to='/user/register'>
                        {/* <li>{AuthReducer.getState().text1}</li> */}
                        <li>REGISTER</li>
                    </Link>
                    <div>|</div>
                    <Link to='/user/login'>
                        <li>LOGIN</li>
                    </Link>
                </ul>
            </div>
        )
    }
}

export default Nav;