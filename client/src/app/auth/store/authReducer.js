/* Reducers */
const isEmpty = require("is-empty");

export const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  error: ''
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case 'LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'GET_ERRORS':
      return {
        ...state,
        error: action.payload.error
      };
    default:
      return state;
  }
}
