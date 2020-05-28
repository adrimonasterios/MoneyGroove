/* Reducers */
import { actionTypes } from './groceriesActions.js';

export const initialState = {
    items: [],
    savedProducts: [],
    bills: [],
    error: '',
    lineChartData: {},
    doughnutChartData: {},
    itemsToShop:[]
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
    case actionTypes.SET_METRICS:
      return {
        ...state,
        lineChartData: action.payload.lineData,
        doughnutChartData: action.payload.doughnutData
      }
    case actionTypes.SET_SELECTED_BILL_ITEMS:
      return {
        ...state,
        items: action.payload
      }
    case actionTypes.SET_VALIDATION_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case actionTypes.SET_ITEMS_TO_SHOP:
      return {
        ...state,
        itemsToShop: action.payload
      }
    case actionTypes.CLEAR_STATE:
      let keysToClear = action.payload
      let clearedState = {...state}
      for(let key in keysToClear){
        clearedState[key] = keysToClear[key]
      }
      return clearedState
    default:
      return state
  }
}
