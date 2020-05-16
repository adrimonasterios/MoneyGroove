import axios from 'axios'

export const actionTypes = {
  ADD_PRODUCT: 'ADD_PRODUCT',
  SET_SAVED_PRODUCTS: 'SET_SAVED_PRODUCTS'
};


export function addProduct(payload) {
  payload = {
    _id: payload.item._id,
    name: payload.item.name,
    brand: payload.item.brand,
    detail: payload.item.detail,
    price: payload.price,
    quantity: payload.quantity
  }
  return {
    type: actionTypes.ADD_PRODUCT,
    payload
   }
}


export function createProduct(data) {
  return async dispatch => {
    try{
      let product = {
        name: data.item,
        brand: data.brand,
        detail: data.detail
      }

      console.log(axios.defaults.headers.common["Authorization"]);
      await axios.post('/api/products/create', product).then(res => {
        dispatch(getProducts())
      })
    }catch(err){
      console.log(err);
    }
  }
}


export function getProducts() {
  return async dispatch => {
    try{
      await axios.get('/api/products').then(products =>
        dispatch(setProducts(products.data))
      )
    }catch(err){
      // dispatch(setSuppliersError(JSON.parse(JSON.stringify(err)).response.data.msg));
      console.log(err);
    }
  }
}


export function setProducts(payload) {
  payload = payload.map(p => {
    p.itemFullName = `${p.name} ${p.brand} (${p.detail})`
    return p
  })

  return {
    type: actionTypes.SET_SAVED_PRODUCTS,
    payload
   }
}


export function createBill(data) {
  return async dispatch => {
    try{
      await axios.post('/api/bills/create', data).then(res => {
        dispatch(getBills()).then(res => res)
      })
    }catch(err){
      console.log(err);
    }
  }
}


export function getBills() {
  return async dispatch => {
    try{
      let bills = await axios.get('/api/bills')
      return bills.data
    }catch(err){
      console.log(err);
    }
  }
}
