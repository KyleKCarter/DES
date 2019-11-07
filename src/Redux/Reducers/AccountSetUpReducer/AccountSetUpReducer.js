import axios from 'axios';

const initialState = {
    twitch_profile_id: '',
    mixer_profile_id: '',
    youtube_profile_id: ''
}

const UPDATE_TWITCH_PROFILE_ID = 'UPDATE_TWITCH_PROFILE_ID';
// const UPDATE_MIXER_PROFILE_ID = 'UPDATE_MIXER_PROFILE_ID';
// const UPDATE_YOUTUBE_PROFILE_ID = 'UPDATE_YOUTUBE_PROFILE_ID';

export const updateTwitchProfileId = () => {
    return {
        type: UPDATE_TWITCH_PROFILE_ID,
        payload: axios.post('/api/twitch_profile_id')
    }
}

export default function reducer(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case UPDATE_TWITCH_PROFILE_ID:
            return {
                ...state,
                twitch_profile_id: payload.data
            }
        default:
            return state
    }
}