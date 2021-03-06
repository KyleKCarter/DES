import axios from 'axios';

const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    loading: false,
    nav: false,
    loggedIn: false,
    finishedChecking: "johndumb",
    user: {}
}

const UPDATE_STATE = 'UPDATE_STATE';
const RESET_FIELDS = 'RESET_FIELDS';
const CHANGE_NAV = 'CHANGE_NAV';
const REGISTER_USER = 'REGISTER_USER';
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const GET_LOGGED_IN_STATUS = "GET_LOGGED_IN_STATUS";

export const getLoggedInStatus = e => {
    return {
        type: GET_LOGGED_IN_STATUS,
        payload: axios.get("/auth/user")
    }
}

export const updateState = e => {
    return {
        type: UPDATE_STATE,
        payload: e
    };
};

export const resetFields = () => {
    return {
        type: RESET_FIELDS
    }
}

export const changeNav = () => {
    return {
        type: CHANGE_NAV
    }
}

export const registerUser = (firstname, lastname, email, username, password) => {
    return {
        type: REGISTER_USER,
        payload: axios.post('/auth/user/register', {
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: password
        })
    }
}

export const loginUser = (username, password) => {
    return {
        type: LOGIN_USER,
        payload: axios.post('/auth/user/login', {
            username: username,
            password: password
        })
    };
};

export const logoutUser = () => {
    return {
        type: LOGOUT_USER,
        payload: axios.post('/auth/user/logout')
    };
};

export default function authReducer(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case `${GET_LOGGED_IN_STATUS}_FULFILLED`:
            return {
                ...state,
                user: payload.data.user,
                loggedIn: payload.data.isLoggedIn,
                finishedChecking: "johnstilldumb"
            }
        case `${GET_LOGGED_IN_STATUS}_REJECTED`:
            return {
                ...state,
                loggedIn: payload.data.isLoggedIn,
                finishedChecking: "johnstilldumb"
            }
        case UPDATE_STATE:
            return {
                ...state,
                ...payload
            };
        case RESET_FIELDS:
            return {
                ...state
            };
        case `${REGISTER_USER}_PENDING`:
            return {
                ...state,
                loading: true
            };
        case `${REGISTER_USER}_FULFILLED`:
            return {
                ...state,
                loading: false,
                loggedIn: true,
                payload: payload.data
            }
        case `${LOGIN_USER}_PENDING`:
            return {
                ...state,
                loading: true
            };
        case `${LOGIN_USER}_FULFILLED`:
            return {
                ...state,
                loading: false,
                nav: true,
                loggedIn: true,
                user: payload.data
            };
        case `${LOGOUT_USER}_PENDING`:
            return {
                ...state,
                loading: true
            };
        case `${LOGOUT_USER}_FULFILLED`:
            return {
                ...state,
                loading: false,
                nav: false,
                user: {}
            };
        default:
            return state;
    }
}