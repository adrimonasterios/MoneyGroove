/* Reducers */
import { actionTypes } from './landingActions.js';

export const initialState = {
    items: [],
};

export function landingReducer(state = initialState, action) {
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
    case actionTypes.SET_ITEMS:
      return {
        ...state,
      }
    default:
      return state
  }
}
