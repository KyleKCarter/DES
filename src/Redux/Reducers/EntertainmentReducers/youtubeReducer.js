import axios from 'axios';
require('dotenv').config();

const initialState = {
    youtube_profile_id: '',
    loading: false
}

const UPDATE_YOUTUBE_PROFILE_ID = 'UPDATE_YOUTUBE_PROFILE_ID';

export const updateYoutubeProfileId = () => {
    return {
        type: UPDATE_YOUTUBE_PROFILE_ID,
        payload: axios.get('/api/youtube_profile_id')
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case `${UPDATE_YOUTUBE_PROFILE_ID}_PENDING`:
            return {
                ...state,
                loading: true
            };
        case `${UPDATE_YOUTUBE_PROFILE_ID}_FULFILLED`:
            return {
                ...state,
                loading: false,
                youtube_profile_id: payload.data.youtube_profile_id
            };
        default:
            return state
    }
}