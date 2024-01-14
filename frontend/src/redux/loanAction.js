import {
    ADD_LOAN,
    GET_LOAN,
    GET_LOANS,
    GET_PAYMENT_HISTORY,
    ITEMS_LOADING,
    PAY_LOAN
} from "./loanTypes"; 

import axios from "axios";

// const getToken = () => localStorage.getItem("token");

// // Axios instance with common configurations
// const axiosInstance = axios.create({
//     baseURL: "http://localhost:4000/api/v1/",
//     headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${getToken()}` // Include the token in the Authorization header
//     }
// });

// // Function to update the headers if the token changes
// const updateHeaders = () => {
//     axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
// };

// // Interceptor to update the headers before each request
// axiosInstance.interceptors.request.use(
//     (config) => {
//         updateHeaders();
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export const getLoans = (token) => dispatch => {
    dispatch(setItemsLoading());
    // axiosInstance.get(`loan`)
    axios.get("http://localhost:4000/api/v1/loans", {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
        .then((res) =>{
            dispatch({
                type: GET_LOANS,
                payload: res.data,
            })
       } )
};

export const getLoan = (id, token) => (dispatch) => {
    dispatch(setItemsLoading());
    // axiosInstance.get(`loan/${id}`)
    axios.get(`http://localhost:4000/api/v1/loan/${id}`,{
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
        .then((res) =>{
            dispatch({
                type: GET_LOAN,
                payload: res.data
            })
        })
};

export const createLoan = (loan, token) => (dispatch) => {
    dispatch(setItemsLoading());
    // axiosInstance.post(`new/loan`, loan)
    axios.post(`http://localhost:4000/api/v1/new/loan`, loan , {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
        .then((res) =>{
            dispatch({
                type: ADD_LOAN,
                payload: res.data,
            })
        })
};

export const payLoan = (pay, token) => (dispatch) => {
    dispatch(setItemsLoading());
    // axiosInstance.put(`loan/${pay._id}`, pay)
    axios.put(`http://localhost:4000/api/v1/loan/${pay._id}`, pay,{
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
        .then((res) =>{
            dispatch({
                type: PAY_LOAN,
                payload: res.data
            })
       } )
};

export const getPaymentHistory = (id, token) => (dispatch) => {
    dispatch(setItemsLoading());
    // axiosInstance.get(`history/${id}`)
    axios.get(`http://localhost:4000/api/v1/history/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
        .then((res) =>{
            dispatch({
                type: GET_PAYMENT_HISTORY,
                payload: res.data
            })
       } )
};

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};