import axios from 'axios'

export const actionTypes = {
  ADD_PRODUCT: 'ADD_PRODUCT',
  SET_SAVED_PRODUCTS: 'SET_SAVED_PRODUCTS',
  SET_BILLS: 'SET_BILLS',
  SET_SELECTED_BILL_ITEMS: 'SET_SELECTED_BILL_ITEMS',
  CLEAR_STATE: 'CLEAR_STATE',
  SET_VALIDATION_ERROR: 'SET_VALIDATION_ERROR',
  SET_LINE_CHART_DATA: 'SET_LINE_CHART_DATA',
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


export function createBill(payload) {
  return async dispatch => {
    try{
      await axios.post('/api/bills/create', payload).then(res => {
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
      await axios.get('/api/bills').then(bills =>
        dispatch(setBills(bills.data))
      )
    }catch(err){
      console.log(err);
    }
  }
}


export function setBillTotalsByPeriod(bills){
  //hacer un loop sobre los bills
  //ver de que mes es el bill
  let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  let currentMonth = new Date
  console.log(currentMonth);
  currentMonth = currentMonth.getMonth()
  let periods = []
  bills.forEach((bill, i) => {
    let date = new Date(bill.date)
    let billMonth = date.getMonth()

    //Get bill total and assign it to its month
    periods[billMonth] =
    bill.items.length === 1?
      Number(bill.items[0].price) :
      bill.items.reduce((accumulator, current, index) => {
        accumulator = index <= 1? Number(accumulator.price) : accumulator
         return accumulator + Number(current.price)
      })
  })
  let data = {
    labels: months.filter((m, i) => i <= currentMonth),
    datasets: [
      {
        label: 'Total Mercado',
        data:periods,
        backgroundColor: 'rgba(173, 200, 37, 0.4)',
        borderColor: 'rgba(173, 200, 37, 1)'
      }
    ]
  }
  return {
    type: actionTypes.SET_LINE_CHART_DATA,
    payload: data
  }

}


export function setBills(payload) {
  return async dispatch => {
    dispatch(setBillTotalsByPeriod(payload))
    return {
      type: actionTypes.SET_BILLS,
      payload
    }
  }
}


export function setSelectedBillItems(payload) {
  return {
    type: actionTypes.SET_SELECTED_BILL_ITEMS,
    payload
  }
}


export function clearState(payload = []) {
  return {
    type: actionTypes.CLEAR_STATE,
    payload
  }
}


export function deleteSelectedBill(payload) {
  return async dispatch => {
    try{
      await axios.delete(`/api/bills/${payload}`).then(res => {
        res.data === "OK" &&
        dispatch(getBills())
      })
    }catch(err){
      console.log(err);
    }
  }
}


export function removeBillItems(itemsToRemove, items) {
  let newItemsArray = items.filter(item => !itemsToRemove.includes(item._id))
  return {
    type: actionTypes.SET_SELECTED_BILL_ITEMS,
    payload: newItemsArray
   }
}


export function updateSelectedBill(payload) {
  return async dispatch => {
    try{
      await axios.put(`/api/bills/${payload._id}`, payload).then(res => {
        res.data === "OK" &&
        dispatch(getBills())
      })
    }catch(err){
      console.log(err);
    }
  }
}


export function setValidationError(payload) {
  return {
    type: actionTypes.SET_VALIDATION_ERROR,
    payload
   }
}
