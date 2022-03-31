import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import studentReducer from './studentReducer';

export const store = createStore(
    studentReducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        thunkMiddleware,
    )
);