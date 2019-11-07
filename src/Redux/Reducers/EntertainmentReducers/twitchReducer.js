import axios from 'axios';

const initialState = {
    display_name: '',
    follows: {}
}

const UPDATE_DISPLAY_NAME = 'UPDATE_DISPLAY_NAME';
const UPDATE_FOLLOWS = 'UPDATE_FOLLOWS';

export const updateFollows = () => {
    return {
        type: UPDATE_FOLLOWS,
        payload: axios.get(`https://api.twitch.tv/helix/users/follows?from_id=${profile_iD}`)
    }
};

export const updateDisplayName = () => {
    return {
        type: UPDATE_DISPLAY_NAME,
        payload: axios.get(`https://api.twitch.tv/helix/users?id=${state.follows.display_name}`)
    }
};

export default function authReducer(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case UPDATE_FOLLOWS:
            return {
                ...state,
                follows: payload.data
            };
        case UPDATE_DISPLAY_NAME:
            return {
                ...state,
                display_name: payload.data.display_name
            };
        default:
            return state
    }
}
