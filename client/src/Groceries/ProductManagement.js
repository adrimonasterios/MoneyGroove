import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as groceriesActions from './store/groceriesActions';
import * as helperFunctions from '../app/helpers.js';

import Table from '../Utils/Table'

import { withStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { lighten } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const managementHeadCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Item', format: false},
  { id: 'brand', numeric: true, disablePadding: false, label: 'Marca', format: false},
  { id: 'detail', numeric: true, disablePadding: false, label: 'Detalle', format: false},
  { id: 'cheapestPrice', numeric: true, disablePadding: false, label: 'Mas barato', format: false},
  { id: 'cheapestStore', numeric: true, disablePadding: false, label: 'Mercado', format: false},
  { id: 'bills', numeric: true, disablePadding: false, label: 'Compras', format: false},
]


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const styles = theme => ({
  root: {
    width: '90%',
    fontFamily: theme.typography.fontFamily,
    padding: "1em",
    backgroundColor: theme.palette.background
  },
  groceries: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  itemsList: {
    height: '100%',
    width: '100%',
    borderRadius: '4px',
    boxShadow: '0 2px 4px 0 #c5c5e2;',
    backgroundColor: '#fff',
    padding: '2% 2% 3% 2%',
  },
  paper: {
    backgroundColor: 'white'
  },
  savedBill: {
    padding: '3%',
    margin: '1em 0',
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-between',
    transition: '0.3',
    cursor: "pointer",
    width: '60%',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    borderRadius: '4px',
    "&:hover":{
      backgroundColor: lighten(theme.palette.primary.light, 0.9),
      color: theme.palette.primary.main
    }
  },
});

class ProductManagement extends React.Component{
  constructor(){
    super();
    this.state = {
      deleteDialog: false,
      itemsToDelete: [],
      replaceDialog: false,
      newValues: [],
      hasBills: false,
      dialogTitle: '',
      dialoContent: ''
    }
    this.showDeleteDialog = this.showDeleteDialog.bind(this)
    this.showReplaceDialog = this.showReplaceDialog.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.replaceProducts = this.replaceProducts.bind(this)
  }

  async componentDidMount(){
    this.props.getProducts()
    this.props.getManagementData()
  }

  showDeleteDialog(selected, items){
    let selectedItems = items.filter(i => selected.includes(i._id))
    this.setState({deleteDialog: true, itemsToDelete: selectedItems}, () => {
      this.hasBills()
    })
  }

  showReplaceDialog(){
    this.setState({deleteDialog: false, replaceDialog: true})
  }

  handleChange(newValue, valueIndex, previousValue){
    let values = this.state.newValues.map(v => v)
    let newValueObject = newValue? {
      previousId: previousValue._id,
      newId: newValue._id,
      bills: previousValue.bills
    } : ''
    values[valueIndex] = newValueObject
    this.setState({newValues: values})
  }

  replaceProducts(){
    this.props.replaceProducts(this.state.newValues)
  }

  hasBills(){
    let itemBills = false
    this.state.itemsToDelete.forEach(item => {
      if('bills' in item && item.bills.length){
        itemBills = true
      }
    })

    this.setState({hasBills: itemBills}, () => this.getDialogContent())
  }

  getDialogContent(){
    const { itemsToDelete, hasBills } = this.state

    if(itemsToDelete.length > 1){
      if(hasBills){
        this.setState({
          dialogTitle:'No se pueden eliminar estos productos',
          dialogText: 'Al menos uno de estos productos es parte de una Compra. Elimina el producto de cada una de las compras a las que esta vinculado'
        })
      }else{
        this.setState({
          dialogTitle:'Estas seguro que quieres eliminar estos productos?',
          dialogText: ''
        })
      }
    }else{
      if(hasBills){
        this.setState({
          dialogTitle:'No se puede eliminar este producto',
          dialogText: 'Este producto es parte de al menos una Compra. Elimina el producto de cada una de las compras a las que esta vinculado'
        })
      }else{
        this.setState({
          dialogTitle:'Estas seguro que quieres eliminar este producto?',
          dialogText: ''
        })
      }
    }
  }

  goToBill(bill){
    this.props.history.push({
      pathname: '/compras',
      state: { bill }
    })
  }

  closeDialog(){
    this.setState({deleteDialog: false, replaceDialog: false, hasBills: false})
  }

  render(){
    const { classes, groceries } = this.props
    const {
      deleteDialog,
      itemsToDelete,
      replaceDialog,
      hasBills ,
      dialogTitle,
      dialogText
    } = this.state

    return(
      <div className={classes.root}>
        <div className={classes.groceries}>
          <div className={classes.itemsList}>
            <h2 style={{fontWeight: 200, marginTop:0}}>Administracion de Productos</h2>
            {groceries.managementItems.length?
              <Table
                size={570}
                cells='management'
                orderBy='priority'
                orderType='asc'
                headCells={managementHeadCells}
                items={groceries.managementItems}
                header='Añade productos a tu lista'
                icons={{
                  delete:{
                    function1: this.showDeleteDialog
                  }
                }}
                />
              :
              ''
            }
          </div>

          <Dialog
            open={deleteDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.closeDialog}
            classes={{
              paper: classes.paper
            }}
            aria-labelledby="title"
            aria-describedby="description"
          >
            <DialogTitle id="title">
              {dialogTitle}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="description">
                {dialogText}
                {itemsToDelete.map((item, i) =>
                  <span key={`${i}`} style={{margin: '1em 0'}}>
                    {`Elimina ${item.name} de las siguientes Compras:`}
                    {item.bills.map((bill, index) =>
                      <span
                        key={index}
                        className={classes.savedBill}
                        onClick={e => this.goToBill(bill)}
                        >
                        <span style={{marginRight: '1em'}}>{bill.store}</span>
                        <span>{helperFunctions.formatDate(bill.date)}</span>
                      </span>
                    )}
                  </span>
                )}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.showReplaceDialog} color="primary">
                Reemplazar
              </Button>
              <Button onClick={this.closeDialog} color="primary">
                Eliminar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  groceries: state.groceries,
})

const mapDispatchToProps = {
  getProducts: groceriesActions.getProducts,
  getManagementData: groceriesActions.getManagementData,
  replaceProducts: groceriesActions.replaceProducts,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductManagement)));


// <Dialog
//   open={replaceDialog}
//   TransitionComponent={Transition}
//   keepMounted
//   onClose={this.closeDialog}
//   classes={{
//     paper: classes.paper
//   }}
//   aria-labelledby="title"
//   aria-describedby="description"
// >
//   <DialogTitle id="title">
//     Reemplazo de productos
//   </DialogTitle>
//   {itemsToDelete.map((item, i) =>
//     <DialogContent key={`key_${i}`}>
//       <DialogContentText id="description">
//         Elige el producto por el que quieres reemplazar a
//         {` ${item.name} ${item.brand} (${item.detail})`}
//       </DialogContentText>
//       <Autocomplete
//         value={item[i]}
//         options={groceries.savedProducts.filter(i => i._id !== item._id)}
//         clearOnBlur={true}
//         classes={{
//           paper: classes.paper,
//           option: classes.option,
//         }}
//         getOptionSelected={(option, value) => !Object.keys(value).length ? true : option === value}
//         getOptionLabel={(option) => Object.keys(option).length? option.itemFullName : ''}
//         onChange={(e, value) => {
//           this.handleChange(value, i, item)
//         }}
//         className={classes.selectItem}
//         renderInput={(params) => <TextField {...params}
//                                             label="Item"
//                                             variant="outlined"
//                                             />}
//         />
//     </DialogContent>
//   )}
//   <DialogActions>
//     <Button onClick={this.closeDialog} color="primary">
//       Cancelar
//     </Button>
//     <Button onClick={this.replaceProducts} color="primary">
//       Reemplazar{itemsToDelete.length > 1? ' Productos': 'Producto'}
//     </Button>
//   </DialogActions>
// </Dialog>
//
