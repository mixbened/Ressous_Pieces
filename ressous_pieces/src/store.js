import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from './ducks/reducer.js';

export default createStore(reducer, applyMiddleware(ReduxThunk))