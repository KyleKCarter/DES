import {createStore, combineReducers, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';

//reducers
import authReducer from './Reducers/AuthReducer/AuthReducer';
// import TwitchPassportReducer from './Reducers/PassportReducer/TwitchPassportReducer';
// import TwitchReducer from './Reducers/EntertainmentReducers/twitchReducer';

const root = combineReducers ({
    authReducer,
    // TwitchPassportReducer,
    // TwitchReducer
});

export default createStore(root, applyMiddleware(promise));