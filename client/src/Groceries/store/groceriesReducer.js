/* Reducers */
import { actionTypes } from './groceriesActions.js';

export const initialState = {
    items: [],
    savedProducts: []
};

export function groceriesReducer(state = initialState, action) {
  switch(action.type){
    // case actionTypes.SELECT_SUPPLIER_CATEGORY:
    //   let editCategories = state.selectedCategories.map(c=>c)
    //   if(editCategories.indexOf(action.payload)<0){
    //     editCategories.push(action.payload)
    //   }else{
    //     let indexOfCategory = editCategories.indexOf(action.payload);
    //     editCategories.splice(indexOfCategory, 1)
    //   }
    //   return {
    //     ...state,
    //     selectedCategories: editCategories
    //   }
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
    default:
      return state
  }
}
