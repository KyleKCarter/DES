import axios from 'axios';

const intialState = {
    title: '',
    username: '',
    review: '',
    entertainment: '',
    loading: false
}

const UPDATE_STATE = 'UPDATE_STATE';
const RESET_FIELDS = 'RESET_FIELDS';
const ADD_REVIEW = 'ADD_REVIEW';

export const updateState = e => {
    return {
        type: UPDATE_STATE,
        payload: e
    }
}

export const resetFields = () => {
    return {
        type: RESET_FIELDS
    }
}

export const addReview = (entertainment, title, username, review) => {
    return {
        type: ADD_REVIEW,
        payload: axios.post('/api/review/post', {
            entertainment_service: entertainment,
            review_title: title,
            username: username,
            review_text: review
        })
    }
}

export default function postReducer(state = intialState, action) {
    const {type, payload} = action;
    switch(type) {
        case UPDATE_STATE:
            return {
                ...state,
                ...payload
            };
        case RESET_FIELDS:
            return {
                ...state
            };
        case `${ADD_REVIEW}_PENDING`:
            return {
                ...state,
                loading: true
            };
        case `${ADD_REVIEW}_FULFILLED`:
            return {
                ...state,
                loading: false,
                payload: payload.data
            }
        default:
            return state;
    }
}