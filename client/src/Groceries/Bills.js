import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as groceriesActions from './store/groceriesActions';
import * as helperFunctions from '../app/helpers.js';

import ItemForm from './components/ItemForm.js'
import Table from '../Utils/Table.js'
import Placeholder from '../Utils/Placeholder.js'

import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { withStyles } from '@material-ui/styles';
import { lighten } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const billHeadCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Item', format: false},
  { id: 'brand', numeric: true, disablePadding: false, label: 'Marca', format: false},
  { id: 'quantity', numeric: true, disablePadding: false, label: 'Cantidad', format: false},
  { id: 'detail', numeric: true, disablePadding: false, label: 'Detalle', format: false},
  { id: 'price', numeric: true, disablePadding: false, label: 'Precio', format: helperFunctions.formatAmount},
]

const datePickerTheme = createMuiTheme({
  overrides: {
    MuiPickersBasePicker: {
        pickerView: {
          backgroundColor: 'white'
        }
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: 'rgba(59, 41, 152, 1)',
      },
      dayDisabled: {
        color: 'grey',
      },
      current: {
        color: 'grey',
      },
    }
  }
})


const styles = theme => ({
  root: {
    width: '90%',
    fontFamily: theme.typography.fontFamily,
    padding: "1em",
    backgroundColor: theme.palette.background
  },
  groceries: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%'
  },
  bills: {
    width: '30%',
    padding:'16px 24px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px 0 #c5c5e2;',
    backgroundColor: '#fff',
  },
  billsList: {
    height: '80%',
    paddingTop: '1em',
    overflow: 'scroll'
  },
  billContainer: {
    width: '69.5%',
    padding:'16px 24px',
    borderLeft: "1px #eaeaea solid",
    borderRadius: '4px',
    boxShadow: '0 2px 4px 0 #c5c5e2;',
    backgroundColor: '#fff',
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: "2em"
  },
  topForm: {
    display: 'flex',
    justifyContent: "space-between"
  },
  store: {
    width: "65%",
    marginBottom: "2em",
    "& input": {
      fontSize: '2em'
    }
  },
  paper: {
    backgroundColor: 'white'
  },
  billsButtons:{
    marginTop: '12%',
    display: "flex",
    justifyContent: "space-between"
  },
  save: {
    backgroundColor: theme.palette.callToAction.main,
    color: theme.palette.secondary.contrastText,
    height: '3em',
    "&:hover": {
      backgroundColor: theme.palette.callToAction.intense,
    }
  },
  saveB: {
    color: theme.palette.callToAction.main,
    height: '3em',
    "&:hover": {
      backgroundColor: theme.palette.error.contrastText,
      color: theme.palette.callToAction.intense
    }
  },
  delete: {
    color: theme.palette.error.main,
    height: '3em',
    "&:hover": {
      backgroundColor: theme.palette.error.contrastText,
      color: theme.palette.error.light
    }
  },
  savedBill: {
    padding: '3%',
    marginBottom: '1em',
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-between',
    transition: '0.3',
    cursor: "pointer",
    "&:hover":{
      backgroundColor: lighten(theme.palette.primary.light, 0.9),
      color: theme.palette.primary.main
    }
  },
  selectedSavedBill: {
    padding: '3%',
    marginBottom: '1em',
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'space-between',
    transition: '0.3'
  },
  total: {
    textAlign: 'right',
    color: theme.palette.text.secondary,
    "&>span": {
      marginLeft: '0.5em'
    }
  },
  error:{
    color: theme.palette.error.main,
    height: '2.5em',
    marginBottom: 0
  }
});

class Bills extends React.Component{
  constructor(){
    super();
    this.state = {
      stores: [],
      selectedDate: Date.now(),
      store: '',
      selectedBill: {},
      newBillForm: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  async componentDidMount(){
    let bill = {}
    if(this.props.location.state && 'bill' in this.props.location.state) bill = this.props.location.state.bill
    if(Object.keys(bill).length) this.selectBill(bill)
    this.props.getProducts()
    this.props.getBills()
  }

  handleDateChange(e){
    this.setState({selectedDate: e})
  }

  handleChange(e, field){
    this.setState({[field]: e})
  }

  handleSubmit(e, item, action){
    e.preventDefault()
    action === 'create'?
      this.props.createProduct(item):
      this.props.addProduct(item)
  }

  selectBill(bill){
    const { savedProducts : products, error, bills } = this.props.groceries
    //If the bill only has the id key (e.g product management)
    console.log('bill1', bill);
    if((!('items' in bill)) && '_id' in bill){
      bill = bills.filter(b => b._id === bill._id)[0]
    }
    console.log('bill2', bill);
    this.setState({selectedBill: bill})

    if(error) this.props.setValidationError('')

    console.log('bill3', bill);
    if(Object.keys(products).length){
      if(this.state.newBillForm) this.setState({newBillForm: false})
      //find out which products does the bill have and populate each bill item with the product information (avoid loop within loop)
      const billItemsIds = bill.items.map(i => i._id)
      let billItems = {}
      products.filter(p => billItemsIds.includes(p._id)).forEach(p => billItems[p._id] = p)
      let items = bill.items.map(i => {
        let item = {
          _id: i._id,
          name: billItems[i._id].name,
          brand: billItems[i._id].brand,
          category: billItems[i._id].category,
          detail: billItems[i._id].detail,
          price: i.price,
          quantity: i.quantity
        }
        return item
      })
      this.props.setSelectedBillItems(items)
    }
  }

  deleteBill(id){
    this.setState({selectedBill: {}})
    this.props.deleteSelectedBill(id)
  }

  openNewBillForm(){
    if(this.props.groceries.error) this.props.setValidationError('')
    this.props.clearState({items: []})
    this.setState({newBillForm: true, selectedBill: {}})
  }

  getBillTotal(items){
    let total = 0;
    items.forEach(i => total += Number(i.price))
    total = helperFunctions.formatAmount(String(total))
    return total
  }

  saveBillValidation(store, date, items){
    const { setValidationError } = this.props
    let isValid = true
    if(!store){
      setValidationError('Campo Mercado es requerido')
      isValid = false
    }else if(!date){
      setValidationError('Capo Fecha es requerido')
      isValid = false
    }else if(!Object.keys(items).length){
      setValidationError('La lista de compra esta vacia')
      isValid = false
    }
    return isValid
  }

  saveBill(items){
    const { store, selectedDate: date, selectedBill, newBillForm }  = this.state
    let storeItems = items.map(i => {
      return {
        _id: i._id,
        quantity: i.quantity,
        price: i.price
      }
    })
    let isValid = this.saveBillValidation(store, date, storeItems)
    if(!Object.keys(selectedBill).length && !isValid) return
    if(Object.keys(selectedBill).length){
      const updatedBill = Object.assign({}, selectedBill);
      updatedBill.items = storeItems
      this.props.updateSelectedBill(updatedBill)
      this.setState({selectedBill: {}})
    }else if(newBillForm){

      let newBill = {
        store,
        date,
        items: storeItems
      }
      this.props.createBill(newBill)
      this.setState({newBillForm: false})
    }
  }

  render(){
    const { selectedDate, newBillForm, selectedBill } = this.state
    const { classes, groceries } = this.props

    let billsStores = this.props.groceries.bills.map(b => b.store)
    let savedStores = [...new Set(billsStores)]

    return(
      <div className={classes.root}>
        <div className={classes.groceries}>
          <div className={classes.bills}>
            <h2 style={{fontWeight: 200, margin:0}}>Compras Anteriores</h2>
            <div className={classes.billsList}>
              {groceries.bills.reverse().map((bill, i) =>
                <Paper
                  key={i}
                  className={selectedBill._id === bill._id? classes.selectedSavedBill : classes.savedBill}
                  onClick={e => this.selectBill(bill)}
                  >
                  <span style={{marginRight: '1em'}}>{bill.store}</span>
                  <span>{helperFunctions.formatDate(bill.date)}</span>
                </Paper>
              )}
            </div>
            <div className={classes.billsButtons}>
              <Button
                className={classes.saveB}
                onClick={(e) => this.openNewBillForm()}
                >
                Nueva Compra
              </Button>
              {Object.keys(selectedBill).length?
                <Button
                  className={classes.delete}
                  onClick={(e) => this.deleteBill(selectedBill._id)}
                  >
                  Eliminar Compra
                </Button>
                :
                ""
              }
            </div>
          </div>
          {!newBillForm && !Object.keys(selectedBill).length ?
            <div className={classes.billContainer}>
              <Placeholder>
                <p>Selecciona una Compra
                  <br/>o<br/>
                  Crea una nueva
                </p>
              </Placeholder>
            </div>
            :
            <div className={classes.billContainer}>
                <div className={classes.title}>
                  <h2 style={{fontWeight: 200, margin:0}}>
                    { !newBillForm && Object.keys(selectedBill).length ? `${selectedBill.store} (${helperFunctions.formatDate(selectedBill.date)})` : 'Nueva Compra'}
                  </h2>
                  <Button
                    variant="contained"
                    className={classes.save}
                    onClick={(e) => this.saveBill(groceries.items)}
                    >
                    { newBillForm ? 'Guardar Compra' : 'Actualizar Compra'}
                  </Button>
                </div>
                { newBillForm ?
                  <div className={classes.topForm}>
                      <Autocomplete
                        options={savedStores}
                        freeSolo={true}
                        onInputChange={(e, value) => this.handleChange(value, "store")}
                        classes={{
                          paper: classes.paper,
                          option: classes.option,
                        }}
                        onChange={(e, value) => {
                          this.handleChange(value, "store")
                        }}
                        className={classes.store}
                        renderInput={(params) => <TextField {...params}

                                                            label="Mercado"
                                                            />}
                        />
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <ThemeProvider theme={datePickerTheme}>
                          <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Fecha de compra"
                            value={selectedDate}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                            />
                        </ThemeProvider>
                    </MuiPickersUtilsProvider>
                  </div>
                  :
                  ''
                }
                <ItemForm
                  handleSubmit={this.handleSubmit}
                  items={groceries.savedProducts}
                  setValidationError={this.props.setValidationError}
                  />
                <p className={classes.error}>{groceries.error}</p>
                <Table
                  size={ newBillForm ? 350 : 460}
                  orderType='asc'
                  orderBy=''
                  headCells={billHeadCells}
                  items={groceries.items}
                  header='Compra'
                  cells="bill"
                  icons={{
                    delete:{
                      show: true,
                      function1: this.props.removeBillItems
                    }
                  }}
                  />
                <h2 className={classes.total}>
                  Total:
                  <span>
                    {this.getBillTotal(groceries.items)}
                  </span>
                </h2>
              </div>
            }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  groceries: state.groceries,
})

const mapDispatchToProps = {
  addProduct: groceriesActions.addProduct,
  createProduct: groceriesActions.createProduct,
  getProducts: groceriesActions.getProducts,
  createBill: groceriesActions.createBill,
  getBills: groceriesActions.getBills,
  setSelectedBillItems: groceriesActions.setSelectedBillItems,
  clearState: groceriesActions.clearState,
  deleteSelectedBill: groceriesActions.deleteSelectedBill,
  removeBillItems: groceriesActions.removeBillItems,
  updateSelectedBill: groceriesActions.updateSelectedBill,
  setValidationError: groceriesActions.setValidationError,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(Bills)));
