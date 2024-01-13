import {
    ADD_LOAN,
    GET_LOAN,
    GET_LOANS,
    GET_PAYMENT_HISTORY,
    ITEMS_LOADING,
    PAY_LOAN
} from "./loanTypes"; 

import axios from "axios";

const getToken = () => localStorage.getItem("token");

// Axios instance with common configurations
const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api/v1/",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}` // Include the token in the Authorization header
    }
});

// Function to update the headers if the token changes
const updateHeaders = () => {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
};

// Interceptor to update the headers before each request
axiosInstance.interceptors.request.use(
    (config) => {
        updateHeaders();
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const getLoans = () => dispatch => {
    dispatch(setItemsLoading());
    axiosInstance.get(`loan`)
        .then((res) =>
            dispatch({
                type: GET_LOANS,
                payload: res.data,
            })
        )
};

export const getLoan = (id) => (dispatch) => {
    dispatch(setItemsLoading());
    axiosInstance.get(`loan/${id}`)
        .then((res) =>
            dispatch({
                type: GET_LOAN,
                payload: res.data
            })
        )
};

export const createLoan = (loan) => (dispatch) => {
    dispatch(setItemsLoading());
    axiosInstance.post(`new/loan`, loan)
        .then((res) =>
            dispatch({
                type: ADD_LOAN,
                payload: res.data,
            })
        )
};

export const payLoan = (pay) => (dispatch) => {
    dispatch(setItemsLoading());
    axiosInstance.put(`loan/${pay._id}`, pay)
        .then((res) =>
            dispatch({
                type: PAY_LOAN,
                payload: res.data
            })
        )
};

export const getPaymentHistory = (id) => (dispatch) => {
    dispatch(setItemsLoading());
    axiosInstance.get(`history/${id}`)
        .then((res) =>
            dispatch({
                type: GET_PAYMENT_HISTORY,
                payload: res.data
            })
        )
};

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};