import axios from 'axios';

// attach auth header to all request
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // clear the auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
