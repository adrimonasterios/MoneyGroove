import axios from 'axios'

export const actionTypes = {
  ADD_PRODUCT: 'ADD_PRODUCT',
  SET_SAVED_PRODUCTS: 'SET_SAVED_PRODUCTS',
  SET_BILLS: 'SET_BILLS',
  SET_SELECTED_BILL_ITEMS: 'SET_SELECTED_BILL_ITEMS',
  CLEAR_STATE: 'CLEAR_STATE',
  SET_VALIDATION_ERROR: 'SET_VALIDATION_ERROR',
  SET_METRICS: 'SET_METRICS',
  SET_ITEMS_TO_SHOP: 'SET_ITEMS_TO_SHOP',
  SET_MANAGEMENT: 'SET_MANAGEMENT',
};


export function addProduct(payload) {
  payload = {
    _id: payload.item._id,
    name: payload.item.name,
    brand: payload.item.brand,
    category: payload.item.category,
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
        category: data.category,
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
        dispatch(manageBills(bills.data))
      )
    }catch(err){
      console.log(err);
    }
  }
}


export function manageBills(payload) {
  return async (dispatch, getState) => {
    dispatch(getMetrics(payload))
    dispatch(setBills(payload))
  }
}


function getLineChartData(data){
    let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    let currentMonth = new Date()
    currentMonth = currentMonth.getMonth()
    let periods = []
    data.forEach((m, i) => {
      let month = m._id
      periods[month - 1] = m.totalAmount
    })
    let lineData = {
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
    return lineData
}


function getDoughnutChartData(data){
    let doughnutData = {
      labels: data.map((l, i) => l._id),
      datasets: [
        {
          label: 'Categorias',
          data: data.map((d, i) => d.total),
          backgroundColor: [
            'rgba(59, 41, 152, 0.7)', //primary
            'rgba(139, 62, 223, 0.7)', //secondary
            'rgba(173, 200, 37, 0.7)', //callToAction
            'rgba(255, 59, 94, 0.7)',//red
            'rgba(0, 102, 177, 0.7)', //blue
            'rgba(3, 170, 155, 0.7)', //light-blue
            'rgba(235, 181, 45, 0.7)',//yellow
            'rgba(203, 200, 200, 0.7)', // grey
          ],
          borderColor: [
            'rgba(59, 41, 152, 1)', //primary
            'rgba(139, 62, 223, 1)', //secondary
            'rgba(173, 200, 37, 1)', //callToAction
            'rgba(255, 59, 94, 1)',//red
            'rgba(0, 102, 177, 1)', //blue
            'rgba(3, 170, 155, 1)', //light-blue
            'rgba(235, 181, 45, 1)',//yellow
            'rgba(203, 200, 200, 1)', // grey
          ]
        }
      ]
    }
    return doughnutData
}


export function getMetrics(){
  return async dispatch => {
    try{
      await axios.get('/api/bills/metrics').then(async bills => {
        const { data } = bills
        const lineData = await getLineChartData(data[0])
        const doughnutData = await getDoughnutChartData(data[1])
        const metrics = {lineData, doughnutData}
        dispatch(setMetrics(metrics))
        }
      )
    }catch(err){
      console.log(err);
    }
  }
}


export function setMetrics(metrics) {
  return {
    type: actionTypes.SET_METRICS,
    payload: metrics
  }
}


export function setBills(payload) {
  return {
    type: actionTypes.SET_BILLS,
    payload
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


export function getShoppingListData(payload) {
  return async dispatch => {
    try{
      await axios.get(`/api/bills/shoppingList`).then(res => {
        dispatch(setItemsToShop(res.data))
      })
    }catch(err){
      console.log(err);
    }
  }
}


export function setItemsToShop(payload) {
  return {
    type: actionTypes.SET_ITEMS_TO_SHOP,
    payload
  }
}


export function getManagementData(payload) {
  return async dispatch => {
    try{
      await axios.get(`/api/bills/management`).then(res => {
        console.log(res.data);
        dispatch(setManagementItems(res.data))
      })
    }catch(err){
      console.log(err);
    }
  }
}


export function setManagementItems(payload) {
  return {
    type: actionTypes.SET_MANAGEMENT,
    payload
  }
}


export function replaceProducts(payload) {
  return async dispatch => {
    try{
      await axios.put(`/api/bills`, payload).then(res => {
        console.log(res);
        // res.data === "OK" &&
        // dispatch(getBills())
      })
    }catch(err){
      console.log(err);
    }
  }
}
