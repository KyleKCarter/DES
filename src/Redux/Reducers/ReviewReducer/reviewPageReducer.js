import axios from 'axios';

const initialState = {
    loading: false,
    reviews: []
}

const UPDATE_REVIEWS = 'UPDATE_REVIEWS';

export const getReviews = () => {
    return {
        type: UPDATE_REVIEWS,
        payload: axios.get('/api/reviews')
    }
}

export default function reviewReducer(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
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