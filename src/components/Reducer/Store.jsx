import {createStore,combineReducers} from 'redux';
import reducer from './reducer';

const mainReducer = combineReducers({
    navReducer: reducer
})

const store = createStore(mainReducer)

export default store