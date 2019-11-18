import axios from 'axios';

const initialState = {
    userProfile: [],
    userReviews: [],
    review_title: '',
    review_text: ''
}

const GET_USER_INFO = 'GET_USER_INFO';
const GET_USER_REVIEWS = 'GET_USER_REVIEWS';
const UPDATE_STATE = 'UPDATE_STATE';
const EDIT_USER_REVIEW = 'EDIT_USER_REVIEW';
const DELETE_USER_REVIEW = 'DELETE_USER_REVIEW';

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

export const updateState = e => {
    return {
        type: UPDATE_STATE,
        payload: e
    }
}

export const editUserReview = (reviewId, review_title, review_text) => {
    console.log(review_title);
    console.log(review_text);
    console.log(reviewId)
    return {
        type: EDIT_USER_REVIEW,
        payload: axios.put(`/api/review/edit/${reviewId}`, {
            review_title: review_title,
            review_text: review_text
        })
    }
}

export const deleteUserReview = (id) => {
    return {
        type: DELETE_USER_REVIEW,
        payload: axios.delete(`/api/review/delete/${id}`)
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
        case UPDATE_STATE:
            return {
                ...state,
                ...payload
            }
        case `${EDIT_USER_REVIEW}_FULFILLED`:
            return {
                ...state,
                payload: payload.data
            }
        case `${DELETE_USER_REVIEW}_FULFILLED`:
            return {
                ...state,
                payload: payload.data
            }
        default:
            return state;
    }
}