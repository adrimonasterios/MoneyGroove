// import axios from 'axios'

export const actionTypes = {
  // SET_ITEMS: 'SET_ITEMS'
};

//
// export function setItems(payload) {
//   return {
//     type: actionTypes.SET_ITEMS,
//     payload
//    }
// }
//
// export function setSuppliers() {
//   return async dispatch => {
//     try{
//       let {data} = await axios.get('/api/suppliers/get')
//       data = data.sort((a,b)=>a.category.localeCompare(b.category))
//       dispatch({
//         type: actionTypes.SET_SUPPLIERS,
//         payload: data
//       });
//     }catch(err){
//       dispatch(setSuppliersError(JSON.parse(JSON.stringify(err)).response.data.msg));
//     }
//   }
// }
