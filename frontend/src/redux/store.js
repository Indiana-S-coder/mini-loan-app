import { combineReducers} from "redux"
import {thunk} from "redux-thunk"
import { userReducer} from "./userReducer"
import { configureStore } from "@reduxjs/toolkit"

const reducer = combineReducers({
      user: userReducer
})

let initialState = {};

const store = configureStore({
    reducer: reducer   ,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export default store;