import { createStore, combineReducers,applyMiddleware } from 'redux';
import {createForms } from 'react-redux-form'
import {Dishes } from './dishes';
import {Comments } from './comments';
import {Leaders } from './leaders';
import {Promotions } from './promotions';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { initialfeedback } from './Forms';

export const Configurestore = () => {
    const store = createStore(
        combineReducers({
            dishes:Dishes,
            comments:Comments,
            leaders:Leaders,
            promotions:Promotions,
            ...createForms({
                feedback:initialfeedback
            }

            )
        }),
        applyMiddleware(thunk,logger)
        
    );
    return store;
}