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
    case actionTypes.CLEAR_STATE:
      let keysToClear = action.payload.length? action.payload : Object.keys(initialState)
      let clearedState = {...state}
      keysToClear.forEach(key => clearedState[key]= initialState[key])
      console.log(clearedState);
      return clearedState
    default:
      return state
  }
}
