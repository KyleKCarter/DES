import axios from 'axios';

const initialState = {
    loading: false,
    entertainment: '',
    reviews: [],
    goodJuJu: 0,
    badJuJu: 0,
    JuJu: 0
}

const UPDATE_REVIEWS = 'UPDATE_REVIEWS';
const UPDATE_ENTERTAINMENT = 'UPDATE_ENTERTAINMENT';
const UPDATE_GOODJUJU = 'UPDATE_GOODJUJU';
const UPDATE_BADJUJU = 'UPDATE_BADJUJU';
const UPDATE_JUJU = 'UPDATE_JUJU';

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

export const increaseJuJu = () => {
    return {
        type: UPDATE_GOODJUJU,
        payload: axios.post('/api/review/entertainment/post/good_juju')
    }
}

export const decreaseJuJu = () => {
    return {
        type: UPDATE_BADJUJU,
        payload: axios.post('/api/review/entertainment/post/bad_juju')
    }
}

export const getJuJu = () => {
    return {
        type: UPDATE_JUJU,
        payload: axios.get('/api/review/entertainment/post/juju')
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
        case `${UPDATE_GOODJUJU}_FULFILLED`:
            return {
                ...state,
                goodJuJu: payload.data
            };
        case `${UPDATE_BADJUJU}_FULFILLED`:
            return {
                ...state,
                badJuJu: payload.data
            }
        case UPDATE_JUJU:
            return {
                ...state,
                JuJu: payload.data
            }
        default:
            return state;
    }
}