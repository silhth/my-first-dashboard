import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'

const initialState = {
    data: []
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'getAllData':
            return (
                action.payload
            );
            case 'getAllDataJson':
            return (
                action.payload
            );
        default:
            return state
    }
}

export const store = createStore(reducer, initialState,applyMiddleware(thunk))