import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    CLEAR_ERRORS,
    LOAN_APPROVAL_REQUEST,
    LOAN_APPROVAL_SUCCESS,
    LOAN_APPROVAL_FAILURE,
} from './userTypes'

import axios from 'axios';

const axiosUserInstance = axios.create({
    baseURL: "http://localhost:4000/api/v1/",
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

// Interceptor to update the headers before each request
axiosUserInstance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })

        const { data } = await axiosUserInstance.post(`login`, { email, password })
        localStorage.setItem('token', data.token);
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
};

// Register user

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })

        const { data } = await axiosUserInstance.post(`register`, userData)
        localStorage.setItem('token', data.token);
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Logout user
export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('token');
        await axios.get(`/api/v1/logout`)

        dispatch({
            type: LOGOUT_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const approveLoanRequest = () => ({
    type: LOAN_APPROVAL_REQUEST,
  });
  
  export const approveLoanSuccess = (loan) => ({
    type: LOAN_APPROVAL_SUCCESS,
    payload: loan,
  });
  
  export const approveLoanFailure = (error) => ({
    type: LOAN_APPROVAL_FAILURE,
    payload: error,
  });
  
  // Action to approve a loan
  export const approveLoan = (loanId) => async (dispatch) => {
    try {
      dispatch(approveLoanRequest());
  
      // Send a request to your backend API to update the loan state
      const response = await axiosUserInstance.put(`loan/approve/${loanId}`);
      console.log(response.data)
  
      dispatch(approveLoanSuccess(response.data.loan));
    } catch (error) {
      dispatch(approveLoanFailure(error.response.data.message));
    }
  };
// Clear Errors

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
};




