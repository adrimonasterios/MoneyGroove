/* Reducers */
import { actionTypes } from './groceriesActions.js';

export const initialState = {
    items: [],
    savedProducts: [],
    bills: []
};

export function groceriesReducer(state = initialState, action) {
  switch(action.type){
    case actionTypes.ADD_PRODUCT:
      state.items.push(action.payload)
      return {
        ...state,
      }
    case actionTypes.SET_SAVED_PRODUCTS:
      return {
        ...state,
        savedProducts: action.payload
      }
    case actionTypes.SET_BILLS:
      return {
        ...state,
        bills: action.payload
      }
    case actionTypes.SET_SELECTED_BILL_ITEMS:
      return {
        ...state,
        items: action.payload
      }
    default:
      return state
  }
}
