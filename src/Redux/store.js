import {createStore, combineReducers, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';

//reducers
import authReducer from './Reducers/AuthReducer/AuthReducer';
import accountSetUpReducer from './Reducers/AccountSetUpReducer/AccountSetUpReducer';
import TwitchReducer from './Reducers/EntertainmentReducers/twitchReducer';

const root = combineReducers ({
    authReducer,
    accountSetUpReducer,
    TwitchReducer
});

export default createStore(root, applyMiddleware(promise));