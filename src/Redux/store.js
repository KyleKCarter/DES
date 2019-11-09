import {createStore, combineReducers, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';

//reducers
import authReducer from './Reducers/AuthReducer/AuthReducer';
import accountSetUpReducer from './Reducers/AccountSetUpReducer/AccountSetUpReducer';
import twitchReducer from './Reducers/EntertainmentReducers/twitchReducer';
import mixerReducer from './Reducers/EntertainmentReducers/mixerReducer';

const root = combineReducers ({
    authReducer,
    accountSetUpReducer,
    twitchReducer,
    mixerReducer
});

export default createStore(root, applyMiddleware(promise));