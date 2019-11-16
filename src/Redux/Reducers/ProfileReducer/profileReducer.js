import axios from 'axios';

const initialState = {
    userProfile: [],
    userReviews: []
}

const GET_USER_INFO = 'GET_USER_INFO';
const GET_USER_REVIEWS = 'GET_USER_REVIEWS';

export const getUserInfo = (id) => {
    return {
        type: GET_USER_INFO,
        payload: axios.get(`/api/user/profile/${id}`)
    }
}

export const getUserReviews = (id) => {
    return {
        type: GET_USER_REVIEWS,
        payload: axios.get(`/api/user/profile/reviews/${id}`)
    }
}

export default function profileReducer (state = initialState, action ) {
    const {type, payload} = action;
    switch(type) {
        case `${GET_USER_INFO}_FULFILLED`:
            return {
                ...state,
                userProfile: payload.data[0]
            };
        case `${GET_USER_REVIEWS}_FULFILLED`:
            return {
                ...state,
                userReviews: payload.data
            }
        default:
            return state;
    }
}