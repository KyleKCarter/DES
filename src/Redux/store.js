import {createStore, combineReducers, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';

//reducers
import authReducer from './Reducers/AuthReducer/AuthReducer';
import TwitchPassportReducer from './Reducers/PassportReducer/TwitchPassportReducer';

const root = combineReducers ({
    authReducer,
    TwitchPassportReducer
});

export default createStore(root, applyMiddleware(promise));