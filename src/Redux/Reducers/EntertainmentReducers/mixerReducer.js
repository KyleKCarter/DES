import axios from 'axios';
require('dotenv').config();

const initialState = {
    mixer_profile_id: '',
    loading: false
}

const UPDATE_MIXER_PROFILE_ID = 'UPDATE_MIXER_PROFILE_ID';

export const updateMixerProfileId = () => {
    return {
        type: UPDATE_MIXER_PROFILE_ID,
        payload: axios.get('/api/mixer_profile_id')
    }
}

export default function reducer(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case `${UPDATE_MIXER_PROFILE_ID}_PENDING`:
            return {
                ...state,
                loading: true
            };
        case `${UPDATE_MIXER_PROFILE_ID}_FULFILLED`:
            return {
                ...state,
                loading: false,
                mixer_profile_id: payload.data.mixer_profile_id
            };
        default:
            return state
    }
}