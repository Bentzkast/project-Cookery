import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('api/users/register', userData)
    .then(res => {
      history.push(res.headers.location);
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

// LOGIN - get user token
export const loginUser = (userData, history) => dispatch => {
  axios
    .post('api/users/login', userData)
    .then(res => {
      // get the token
      const { token } = res.data;
      // set the token to local storage
      localStorage.setItem('jwtToken', token);
      // set auth header to be send latter
      setAuthToken(token);
      // Decode token information
      const decoded = jwt_decode(token);
      // set current user se
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  // remove token from local storage;
  localStorage.removeItem('jwtToken');
  // remove auth header
  setAuthToken(false);
  // reset user store
  dispatch(setCurrentUser({}));
};
