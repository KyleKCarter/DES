import axios from 'axios';

const initialState = {
    twitch_profile_id: '',
    // follows_display_name: '',
    loading: false,
    // follows: {}
}

const UPDATE_TWITCH_PROFILE_ID = 'UPDATE_TWITCH_PROFILE_ID';
// const UPDATE_DISPLAY_NAME = 'UPDATE_DISPLAY_NAME';
// const UPDATE_FOLLOWS = 'UPDATE_FOLLOWS';

export const updateTwitchProfileId = () => {
    return {
        type: UPDATE_TWITCH_PROFILE_ID,
        payload: axios.get('/api/twitch_profile_id')
    }
}

// export const updateFollows = () => {
//     return {
//         type: UPDATE_FOLLOWS,
//         payload: axios.get(`https://api.twitch.tv/helix/users/follows?from_id=${getState().twitch_profile_id}`)
//     }
// };

// export const updateDisplayName = () => {
//     return {
//         type: UPDATE_DISPLAY_NAME,
//         payload: axios.get(`https://api.twitch.tv/helix/users?id=${getState().follows.display_name}`)
//     }
// };

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
        // case `${UPDATE_FOLLOWS}_PENDING`:
        //     return {
        //         ...state,
        //         loading: true
        //     }
        // case `${UPDATE_FOLLOWS}_FULFILLED`:
        //     return {
        //         ...state,
        //         loading: false,
        //         follows: payload.data
        //     };
        // case UPDATE_DISPLAY_NAME:
        //     return {
        //         ...state,
        //         follows_display_name: payload.data.display_name
        //     };
        default:
            return state
    }
}
