import { createStore } from 'redux';
import reducer from './ducks/reducer.js';

export default createStore(reducer)