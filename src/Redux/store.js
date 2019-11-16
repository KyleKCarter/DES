import {createStore, combineReducers, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';

//reducers
import authReducer from './Reducers/AuthReducer/AuthReducer';
import accountSetUpReducer from './Reducers/AccountSetUpReducer/AccountSetUpReducer';
import twitchReducer from './Reducers/EntertainmentReducers/twitchReducer';
import mixerReducer from './Reducers/EntertainmentReducers/mixerReducer';
import youtubeReducer from './Reducers/EntertainmentReducers/youtubeReducer';
import postReducer from './Reducers/ReviewReducer/postReducer';
import reviewReducer from './Reducers/ReviewReducer/reviewPageReducer'
import settingsReducer from './Reducers/ProfileReducer/settingsReducer';
import profileReducer from './Reducers/ProfileReducer/profileReducer';

const root = combineReducers ({
    authReducer,
    accountSetUpReducer,
    twitchReducer,
    mixerReducer,
    youtubeReducer,
    postReducer,
    reviewReducer,
    settingsReducer,
    profileReducer
});

export default createStore(root, applyMiddleware(promise));