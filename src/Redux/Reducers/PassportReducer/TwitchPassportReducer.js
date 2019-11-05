import axios from 'axios';

const initialState = {
    Username: '',
    Password: '',
    user: {}
}

const UPDATE_STATE = 'UPDATE_STATE';
const LOGIN_USER = 'LOGIN_USER';

export const updateState = e => {
    return {
        type: UPDATE_STATE,
        payload: e
    }
}

export const loginUser = () => {
    return {
        type: LOGIN_USER,
        payload: axios.get('/auth/twitch')
    }
}

export default function TwitchPassportReducer(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case UPDATE_STATE:
            return {
                ...state,
                ...payload
            };
        case LOGIN_USER:
            return {
                ...state,
                user: payload.data
            };
        default:
            return state;
    }
}