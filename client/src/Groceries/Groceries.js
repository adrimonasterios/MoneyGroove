import React from 'react';
import { connect } from 'react-redux';
import * as groceriesActions from './store/groceriesActions';

import ItemForm from './components/ItemForm.js'
import Bill from './components/Bill.js'

import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const styles = theme => ({
  root: {
    width: '90%',
    fontFamily: theme.typography.fontFamily,
    padding: "2%",
    backgroundColor: theme.palette.background
  },
  groceries: {
    display: 'flex',
    borderRadius: '4px',
    boxShadow: '0 2px 4px 0 #c5c5e2;',
    backgroundColor: '#fff',
    height: '100%',
    width: '100%'
  },
  bills: {
    width: '30%',
    padding:'16px 24px'
  },
  newBill: {
    width: '70%',
    padding:'16px 24px',
    borderLeft: "1px #eaeaea solid"
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
  save: {
    backgroundColor: theme.palette.callToAction.main,
    color: theme.palette.secondary.contrastText,
    height: '3em',
    "&:hover": {
      backgroundColor: theme.palette.callToAction.intense,
    }
  }
});

class Groceries extends React.Component{
  constructor(){
    super();
    this.state = {
      brands: ['brand1', 'brand2'],
      selectedDate: Date.now(),
      store: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  async componentDidMount(){
    this.props.getProducts()
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

  saveBill(items){
    const { store, selectedDate: date }  = this.state
    let storeItems = items.map(i => {
      return {
        itemId: i._id,
        quantity: i.quantity,
        price: i.price
      }
    })

    let newBill = {
      store,
      date,
      items: storeItems
    }
    this.props.createBill(newBill).then(res => console.log(res))
  }

  render(){
    const { brands, selectedDate } = this.state
    const { classes, groceries } = this.props

    return(
      <div className={classes.root}>
        <div className={classes.groceries}>
          <div className={classes.bills}>
            <h2 style={{fontWeight: 200, margin:0}}>Compras Anteriores</h2>

          </div>
          <div className={classes.newBill}>
            <div className={classes.title}>
              <h2 style={{fontWeight: 200, margin:0}}>Nueva Compra</h2>
              <Button
                variant="contained"
                className={classes.save}
                onClick={(e) => this.saveBill(groceries.items)}
                >
                Guardar Compra
              </Button>
            </div>
            <div className={classes.topForm}>
              <Autocomplete
                options={brands}
                freeSolo={true}
                className={classes.store}
                renderInput={(params) => <TextField {...params}
                label="Mercado"
                onChange={(e) => this.handleChange(e.target.value, "store")}
                />}
                />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
              </MuiPickersUtilsProvider>
            </div>

            <ItemForm
              handleSubmit={this.handleSubmit}
              items={groceries.savedProducts}
              brands={brands}
              />
            <Bill
              size="small"
              items={groceries.items}
              />
            <h2>Total:<span>100</span></h2>
          </div>
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
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Groceries));
