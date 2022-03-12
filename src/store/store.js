import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'

const initialState = {
    data: [],
    day: 11
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'getAllData':
            return (
                {...state, data:[action.payload]}
            );
        case 'getAllDataJson':
            return (
                {...state, data:action.payload}
            );
        case 'setDay':
                return (
                    {...state, day:action.payload}
                );

        case 'nextDay':
            return (
                {...state, day:action.payload}
            );
        case 'previusDay':
                return (
                {...state, day:action.payload}
                );
        default:
            return state
    }
}

export const store = createStore(reducer, initialState, applyMiddleware(thunk))