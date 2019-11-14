import axios from 'axios';

const initialState = {
    loading: false,
    entertainment: '',
    reviews: []
}

const UPDATE_REVIEWS = 'UPDATE_REVIEWS';
const UPDATE_ENTERTAINMENT = 'UPDATE_ENTERTAINMENT'

export const updateEntertainment = e => {
    return {
        type: UPDATE_ENTERTAINMENT,
        payload: e
    }
}

export const getReviews = (entertainment) => {
    return {
        type: UPDATE_REVIEWS,
        payload: axios.get(`/api/reviews/${entertainment}`)
    }
}

export default function reviewReducer(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case UPDATE_ENTERTAINMENT:
            return {
                ...state,
                entertainment: payload
            }
        case `${UPDATE_REVIEWS}_PENDING`:
            return {
                ...state,
                loading: true
            };
        case `${UPDATE_REVIEWS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                reviews: payload.data
            };
        default:
            return state;
    }
}