import axios from 'axios'
import * as authActions from '../../app/auth/store/authActions';

export const actionTypes = {
  ADD_PRODUCT: 'ADD_PRODUCT'
};


// export function setItems(payload) {
//   return {
//     type: actionTypes.SET_ITEMS,
//     payload
//    }
// }

export function addProduct(data) {
  return async dispatch => {
    try{
      console.log(data);
      let product = {
        name: data.item,
        brand: data.brand,
        detail: data.detail
      }
      let token  = localStorage.getItem('jwtToken')
      dispatch(authActions.authenticateUser(token)).then(async res => {
        console.log(axios.defaults.headers.common["Authorization"]);
        await axios.post('/api/products/create', product).then(res => {
          dispatch({
            type: actionTypes.ADD_PRODUCT,
            payload: data
          });
          })
      })
    }catch(err){
      // dispatch(setSuppliersError(JSON.parse(JSON.stringify(err)).response.data.msg));
      console.log(err);
    }
  }
}

export function getProducts() {
  return async dispatch => {
    try{
      let products = await axios.get('/api/products')
      return products.data
    }catch(err){
      // dispatch(setSuppliersError(JSON.parse(JSON.stringify(err)).response.data.msg));
      console.log(err);
    }
  }
}
