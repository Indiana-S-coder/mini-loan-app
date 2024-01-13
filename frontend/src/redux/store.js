import { combineReducers} from "redux"
import {thunk} from "redux-thunk"
import { userReducer, adminloanReducer} from "./userReducer"
import { configureStore } from "@reduxjs/toolkit"
import { loanReducer } from "./loanReducer"


const reducer = combineReducers({
    loan: loanReducer,
    user: userReducer,
    adminLoan: adminloanReducer,
})

let initialState = {};

const store = configureStore({
    reducer: reducer   ,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export default store;