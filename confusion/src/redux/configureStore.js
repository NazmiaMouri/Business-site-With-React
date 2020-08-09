import { createStore } from 'redux';
import { Reducer, initialState } from './reducer';

export const Configurestore = () => {
    const store = createStore(
        Reducer,
        initialState
    );
    return store;
}