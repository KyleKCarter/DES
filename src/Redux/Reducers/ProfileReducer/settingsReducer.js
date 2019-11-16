import axios from 'axios';

const initialState = {
    img: '',
    username: '',
    bio: '',
    loading: false,
    userImg: ''
}

const UPDATE_IMG = 'UPDATE_IMG';
const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_BIO = 'UPDATE_BIO';
const UPDATE_PROFILE_IMG = 'UPDATE_PROFILE_IMG';
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const RESET_FIELDS = 'RESET_FIELDS';
const GET_USER_IMG = 'GET_USER_IMG';

export const updateIMG = e => {
    return {
        type: UPDATE_IMG,
        payload: e
    }
}

export const updateUsername = e => {
    return {
        type: UPDATE_USERNAME,
        payload: e
    }
}

export const updateBio = e => {
    return {
        type: UPDATE_BIO,
        payload: e
    }
}

export const updateProfileImg = (id, img) => {
    return {
        type: UPDATE_PROFILE_IMG,
        payload: axios.put(`/api/user/profile/settings/image/${id}`, {
            img: img
        })
    }
}

export const updateProfile = (id, username, bio) => {
    return {
        type: UPDATE_PROFILE,
        payload: axios.put(`/api/user/profile/settings/${id}`, {
            username: username,
            bio: bio
        })
    }
}

export const resetFields = () => {
    return {
        type: RESET_FIELDS
    }
}

export const getUserInfo = (id) => {
    return {
        type: GET_USER_IMG,
        payload: axios.get(`/api/user/profile/image/${id}`)
    }
}

export default function settingsReducer (state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case UPDATE_IMG:
            return {
                ...state,
                img: payload.img
            };
        case UPDATE_USERNAME:
            return {
                ...state,
                username: payload.username
            };
        case UPDATE_BIO:
            return {
                ...state,
                bio: payload.bio
            };
        case `${UPDATE_PROFILE_IMG}_FULFILLED`:
            return {
                ...state,
                payload: payload.data[0].img
            }
        case `${UPDATE_PROFILE}_PENDING`:
            return {
                ...state, 
                loading: true 
            };
        case `${UPDATE_PROFILE}_FULFILLED`:
            return {
                ...state,
                loading: false,
                payload: payload.data
            };
        case `${GET_USER_IMG}_FULFILLED`:
            return {
                ...state,
                loading: false,
                userImg: payload.data[0].img
            }
        default:
            return state;
    }
}