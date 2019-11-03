import {createStore, combineReducers, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';

//reducers

const root = combineReducers ({

});

export default createStore(root, applyMiddleware(promise));