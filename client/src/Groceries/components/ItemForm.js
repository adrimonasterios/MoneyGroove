import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    justifyContent: "space-between",
    width: '100%',
    "& option": {
      background: 'white'
    }
  },
  item: {
    width: "35%",
  },
  selectItem: {
    width: "40%",
  },
  brand: {
    width: "20%",
    "&.MuiAutocomplete-option": {
        background: 'white'
      }
  },
  quantity: {
    width: "15%"
  },
  detail: {
    width: "20%"
  },
  price: {
    width: "15%"
  },
  submit: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    margin: '5px 0',
    "&:hover": {
      backgroundColor: theme.palette.secondary.intense,
    }
  },
  toggle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    margin: '5px 0',
    "&:hover": {
      backgroundColor: theme.palette.primary.intense,
    }
  },
  paper: {
    backgroundColor: 'white'
  }
}));


function ItemForm (props) {
  const classes = useStyles();
  const { items, handleSubmit } = props

  const [newProductForm, showForm] = useState(false)
  const [newProduct, createProduct] = useState({
    item: '',
    brand: '',
    detail: ''
  });
  const [selectedProduct, addProduct] = useState({
    item: {},
    quantity: '',
    price: ''
  });

  const handleChange = (value, field, action) => {
    action === "create"?
      createProduct({ ...newProduct, [field]: value }):
      addProduct({ ...selectedProduct, [field]: value })
  };

  const handleItem = (e, state, action) => {
    const clearForm = {
      item: '',
      brand: '',
      detail: '',
    }
    const clearItem = {
      item: {},
      quatity: '',
      price: ''
    }
    handleChange({}, 'item', 'add')

    action === 'create'?
      createProduct(clearForm):
      addProduct(clearItem)

    handleSubmit(e, state, action)
  };

  if(newProductForm){
    return(
      <form className={classes.form} onSubmit={e => handleItem(e, newProduct, 'create')} >
        <FormControl fullWidth className={classes.item} variant="outlined">
          <InputLabel htmlFor="item">Item</InputLabel>
          <OutlinedInput
            id="item"
            value={newProduct.item}
            onChange={(e) => handleChange(e.target.value, "item", 'create')}
            labelWidth={60}
            />
        </FormControl>
        <FormControl fullWidth className={classes.brand} variant="outlined">
          <InputLabel htmlFor="brand">Marca</InputLabel>
          <OutlinedInput
            id="brand"
            value={newProduct.brand}
            onChange={(e) => handleChange(e.target.value, "brand", 'create')}
            labelWidth={60}
            />
        </FormControl>
        <FormControl fullWidth className={classes.detail} variant="outlined">
          <InputLabel htmlFor="detail">Detalle</InputLabel>
          <OutlinedInput
            id="detail"
            value={newProduct.detail}
            onChange={(e) => handleChange(e.target.value, "detail", 'create')}
            labelWidth={60}
            />
        </FormControl>
        <Button variant="contained" size="small" className={classes.toggle} onClick={(e) => showForm(false)}>
          Atras
        </Button>
        <Button variant="contained" size="small" className={classes.submit} type="submit">
          Crear
        </Button>
      </form>
    )
  }else{
    return(
      <form className={classes.form} onSubmit={e => handleItem(e, selectedProduct, 'add')} >
        <Autocomplete
          value={selectedProduct.item}
          options={items}
          clearOnBlur={true}
          classes={{
            paper: classes.paper,
            option: classes.option,
          }}
          getOptionLabel={(option) => Object.keys(option).length? option.itemFullName : ''}
          onChange={(e, value) => {
            handleChange(value, "item", 'add')
          }}
          className={classes.selectItem}
          renderInput={(params) => <TextField {...params}
                                              label="Item"
                                              variant="outlined"
                                              />}
          />
        <FormControl fullWidth className={classes.quantity} variant="outlined">
          <InputLabel htmlFor="quantity">Cantidad</InputLabel>
          <OutlinedInput
            id="quantity"
            value={selectedProduct.quantity? selectedProduct.quantity : ''}
            onChange={(e) => handleChange(e.target.value, "quantity", 'add')}
            labelWidth={60}
            />
        </FormControl>
        <FormControl fullWidth className={classes.price} variant="outlined">
          <InputLabel htmlFor="price">Precio</InputLabel>
          <OutlinedInput
            id="price"
            value={selectedProduct.price}
            onChange={(e) => handleChange(e.target.value, "price", 'add')}
            startAdornment={<InputAdornment position="start">Bs.</InputAdornment>}
            labelWidth={60}
            />
        </FormControl>
        <Button variant="contained" size="small" className={classes.toggle} onClick={(e) => showForm(true)}>
          Nuevo Item
        </Button>
        <Button variant="contained" size="small" className={classes.submit} type="submit">
          Insertar
        </Button>
      </form>
    )
  }
}

export default ItemForm


// <FontAwesomeIcon icon={faPlus} color="white" size="2x"/>
