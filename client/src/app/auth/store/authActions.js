import axios from 'axios'
import setAuthToken from "./helpers/setAuthToken";
import jwt_decode from "jwt-decode";

export const actionTypes = {
  GET_ERRORS: 'GET_ERRORS',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  USER_LOADING: 'USER_LOADING',
  LOADING: 'LOADING',
};

// Register User
export const registerUser = (userData, history) => dispatch => {
  console.log('register');
  console.log(userData);
  axios
    .post("/api/users/register", userData)
    .then(res => dispatch(loginUser({email: res.data.email, password: userData.password}, history))) // re-direct to login on successful register
    // .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login
export const loginUser = (userData, history) => dispatch => {
  console.log('login');
  console.log(userData);
  // Get user token
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      console.log('logged');
      dispatch(setCurrentUser(decoded))
      history.push('/dashboard')
      window.location.reload();
    })
    .catch(err => {
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    });
};
// Login
export const authenticateUser = (token) => dispatch => {
  // Check for token to keep user logged in
  if (token) {
    const decoded = jwt_decode(token);
    setAuthToken(token);
    dispatch(setCurrentUser(decoded))

  // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      dispatch(logoutUser())
      window.location.href = "./home";
    }
  }
  return Promise.resolve();
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: actionTypes.USER_LOADING
  };
};

// User loading
export const loading = (boolean) => {
  return {
    type: actionTypes.LOADING,
    payload: boolean
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("navbarPath");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
