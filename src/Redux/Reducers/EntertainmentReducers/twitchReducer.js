import axios from 'axios';
require('dotenv').config();

const initialState = {
    twitch_profile_id: '',
    display_name: '',
    loading: false
}

const UPDATE_TWITCH_PROFILE_ID = 'UPDATE_TWITCH_PROFILE_ID';

export const updateTwitchProfileId = () => {
    return {
        type: UPDATE_TWITCH_PROFILE_ID,
        payload: axios.get('/api/twitch_profile_id')
    }
}

export default function reducer(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case `${UPDATE_TWITCH_PROFILE_ID}_PENDING`:
            return {
                ...state,
                loading: true
            }
        case `${UPDATE_TWITCH_PROFILE_ID}_FULFILLED`:
            return {
                ...state,
                loading: false,
                twitch_profile_id: payload.data.twitch_profile_id
            };
        default:
            return state
    }
}
