import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as groceriesActions from './store/groceriesActions';
import * as helpers from '../app/helpers.js';

import Table from '../Utils/Table'

import { withStyles } from '@material-ui/styles';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { lighten } from '@material-ui/core/styles';


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

const selectTheme = createMuiTheme({
  overrides: {
    MuiSelect:{
      select: {
        "&:focus":{
          backgroundColor: 'white'
        }
      }
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
  deleteButton: {
    color: theme.palette.error.main
  },
  dialogTitle: {
    color: theme.palette.text.secondary
  },
  paperWidthFalse: {
    width: '60%'
  },
  form: {
    display: 'flex',
    justifyContent: "space-between",
    width: '100%',
    "& option": {
      background: 'white'
    }
  },
  item: {
    width: "24%",
  },
  selectItem: {
    width: "40%",
  },
  brand: {
    width: "24%",
    "&.MuiAutocomplete-option": {
        background: 'white'
      }
  },
  detail: {
    width: "24%"
  },
  category: {
    width: "24%"
  },
});

class ProductManagement extends React.Component{
  constructor(){
    super();
    this.state = {
      deleteDialog: false,
      editDialog: false,
      itemsToDelete: [],
      itemsToEdit: [],
      hasBills: false,
      dialogTitle: '',
      dialoContent: '',
      editedProducts: []
    }
    this.showDeleteDialog = this.showDeleteDialog.bind(this)
    this.showEditDialog = this.showEditDialog.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.deleteProducts = this.deleteProducts.bind(this)
    this.updateProducts = this.updateProducts.bind(this)
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

  showEditDialog(selected, items){
    let selectedItems = this.props.groceries.savedProducts.filter(i => selected.includes(i._id))
    //create other array to handle the changes, so the first information keeps intact and can be shown for example in the edit dialog.
     //Each object has to be assigned as a new one, because if not any change will affect both arrays
    let editItems = selectedItems.map(item => {
      let itemCopy = Object.assign({}, item)
      delete itemCopy.itemFullName
      return itemCopy
  })
    this.setState({
      editDialog: true,
      itemsToEdit: selectedItems,
      editedProducts: editItems
    })
  }

  handleChange(value, field, index){
    let products = this.state.editedProducts.map(item => item)
    products[index][field] = value
    this.setState({editedProducts: products})
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

  deleteProducts(){
    let itemsToDeleteIds = this.state.itemsToDelete.map(item => item._id)
    this.props.deleteProducts(itemsToDeleteIds).then(res => this.closeDialog)
  }

  updateProducts(){
    this.props.updateProducts(this.state.editedProducts)
    window.location.reload()
  }

  closeDialog(){
    this.setState({deleteDialog: false, editDialog: false, hasBills: false})
  }

  render(){
    const { productCategories } = helpers.globalVariables
    const { classes, groceries } = this.props
    const {
      deleteDialog,
      editDialog,
      itemsToDelete,
      itemsToEdit,
      hasBills ,
      dialogTitle,
      dialogText,
      editedProducts
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
                  delete: {
                    function1: this.showDeleteDialog
                  },
                  edit: {
                    function1: this.showEditDialog
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
            <DialogTitle id="title" className={classes.dialogTitle}>
              {dialogTitle}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="description">
                {dialogText}
                <br/>
                {itemsToDelete.map((item, i) =>
                  <span key={`${i}`} style={{margin: '1em 0'}}>
                    {hasBills && 'bills' in item? <span>Elimina <span style={{fontWeight: 'bold'}}>{item.name}</span> de las siguientes Compras:</span> : ''}
                    {'bills' in item && item.bills.map((bill, index) =>
                      <span
                        key={index}
                        className={classes.savedBill}
                        onClick={e => this.goToBill(bill)}
                        >
                        <span style={{marginRight: '1em'}}>{bill.store}</span>
                        <span>{helpers.formatDate(bill.date)}</span>
                      </span>
                    )}
                  </span>
                )}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closeDialog} color="primary">
                Cancelar
              </Button>
              <Button onClick={this.deleteProducts} className={classes.deleteButton} disabled={hasBills}>
                Eliminar
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={editDialog}
            TransitionComponent={Transition}
            keepMounted
            maxWidth={false}
            onClose={this.closeDialog}
            classes={{
              paper: classes.paper,
              paperWidthFalse: classes.paperWidthFalse
            }}
            className={classes.editDialog}
            aria-labelledby="title"
            aria-describedby="description"
          >
            <DialogTitle id="title">
              Editar productos
            </DialogTitle>
            {itemsToEdit.map((item, i) =>
              <DialogContent key={`key_${i}`}>
                <DialogContentText id="description">
                  Aqui puedes editar a
                  {` ${item.name} ${item.brand} (${item.detail})`}
                </DialogContentText>
                <form className={classes.form}>
                  <FormControl fullWidth className={classes.item} variant="outlined">
                    <InputLabel htmlFor={`item${i}`}>Item</InputLabel>
                    <OutlinedInput
                      id={`item${i}`}
                      value={editedProducts[i].name}
                      onChange={(e) => this.handleChange(e.target.value, "name", i)}
                      labelWidth={60}
                      />
                  </FormControl>
                  <FormControl fullWidth className={classes.brand} variant="outlined">
                    <InputLabel htmlFor={`brand${i}`}>Marca</InputLabel>
                    <OutlinedInput
                      id={`brand${i}`}
                      value={editedProducts[i].brand}
                      onChange={(e) => this.handleChange(e.target.value, "brand", i)}
                      labelWidth={60}
                      />
                  </FormControl>
                  <FormControl variant="outlined" className={classes.category}>
                    <InputLabel id="category">Categoría</InputLabel>
                    <ThemeProvider theme={selectTheme}>
                    <Select
                      labelId="category"
                      value={editedProducts[i].category}
                      onChange={(e) => this.handleChange(e.target.value, "category", i)}
                      label="Categoría"

                    >
                    {productCategories.map((category, i) =>
                      <MenuItem key={`key_${i}`} value={category}>{category}</MenuItem>
                    )}
                    </Select>
                  </ThemeProvider>
                  </FormControl>
                  <FormControl fullWidth className={classes.detail} variant="outlined">
                    <InputLabel htmlFor={`detail${i}`}>Detalle</InputLabel>
                    <OutlinedInput
                      id={`detail${i}`}
                      value={editedProducts[i].detail}
                      onChange={(e) => this.handleChange(e.target.value, "detail", i)}
                      labelWidth={60}
                      />
                  </FormControl>
                </form>
              </DialogContent>
            )}
            <DialogActions>
              <Button onClick={this.closeDialog} color="primary">
                Cancelar
              </Button>
              <Button onClick={this.updateProducts} color="primary">
                Guardar
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
  deleteProducts: groceriesActions.deleteProducts,
  updateProducts: groceriesActions.updateProducts,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductManagement)));
