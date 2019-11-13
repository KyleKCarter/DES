import axios from 'axios';
require('dotenv').config();

const initialState = {
    twitch_profile_id: '',
    mixer_profile_id: '',
    google_profile_id: '',
    youtube_profile_id: ''
}

const UPDATE_TWITCH_PROFILE_ID = 'UPDATE_TWITCH_PROFILE_ID';
const UPDATE_MIXER_PROFILE_ID = 'UPDATE_MIXER_PROFILE_ID';
const UPDATE_GOOGLE_PROFILE_ID = 'UPDATE_GOOGLE_PROFILE_ID';
// const UPDATE_YOUTUBE_PROFILE_ID = 'UPDATE_YOUTUBE_PROFILE_ID';
const ADD_YOUTUBE_PROFILE_ID = 'ADD_YOUTUBE_PROFILE_ID';

export const updateTwitchProfileId = () => {
    return {
        type: UPDATE_TWITCH_PROFILE_ID,
        payload: axios.post('/api/twitch_profile_id')
    }
}

export const updateMixerProfileId = () => {
    return {
        type: UPDATE_MIXER_PROFILE_ID,
        payload: axios.post('/api/mixer_profile_id')
    }
}

export const updateGoogleProfileId = () => {
    return {
        type: UPDATE_GOOGLE_PROFILE_ID,
        payload: axios.post('/api/google_profile_id')
    }
}

//need to move this to front end
export const addYoutubeProfileId = () => {
    return {
        type: ADD_YOUTUBE_PROFILE_ID,
        payload: axios.post('/api/youtube_profile_id')
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_TWITCH_PROFILE_ID:
            return {
                ...state,
                twitch_profile_id: payload.data
            };
        case UPDATE_MIXER_PROFILE_ID:
            return {
                ...state,
                mixer_profile_id: payload.data
            };
        case UPDATE_GOOGLE_PROFILE_ID:
            return {
                ...state,
                google_profile_id: payload.data
            };
        case ADD_YOUTUBE_PROFILE_ID:
            return {
                ...state,
                youtube_profile_id: payload.data
            }
        default:
            return state
    }
}