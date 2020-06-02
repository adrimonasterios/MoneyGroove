import React, { useState } from 'react';
import * as helpers from '../../app/helpers.js'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


const productCategories = [
  'Abarrotes',
  'Bebes y Niños',
  'Bebidas',
  'Carnes',
  'Cuidado Personal',
  'Frutas',
  'Hogar',
  'Lacteos',
  'Limpieza',
  'Mascotas',
  'Pasteleria',
  'Snacks',
  'Verduras',
]

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
    width: "22%",
  },
  selectItem: {
    width: "40%",
  },
  brand: {
    width: "18%",
    "&.MuiAutocomplete-option": {
        background: 'white'
      }
  },
  detail: {
    width: "15%"
  },
  category: {
    width: "20%"
  },
  quantity: {
    width: "15%"
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
    backgroundColor: 'white',
    "& *":{
      backgroundColor: 'white !important'
    }
  },
  option: {
    "&:hover":{
      backgroundColor: '#f5f5f5 !important'
    }
  }
}));


function ItemForm (props) {
  const classes = useStyles();
  const { items, handleSubmit } = props

  const [newProductForm, showForm] = useState(false)
  const [newProduct, createProduct] = useState({
    item: '',
    brand: '',
    category: '',
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
    e.preventDefault()
    let isError = checkForErrors(state, action)

    if(!isError){
      const clearForm = {
        item: '',
        brand: '',
        category: '',
        detail: '',
      }
      const clearItem = {
        item: {},
        quantity: '',
        price: ''
      }
      handleChange({}, 'item', 'add')

      action === 'create'?
      createProduct(clearForm):
      addProduct(clearItem)

      props.setValidationError('')
      handleSubmit(e, state, action)
    }
  };

  const checkForErrors = (state, action) => {
    const { setValidationError } = props
    let isError = false
    //regex to see if string has only digits
    let reg = /^\d+$/;
    var regWithDot = /^[0-9]*\.?[0-9]*$/;

    let emptyField = false
    for(let key in state){
      if(!state[key]) emptyField = true
    }
    if(emptyField){
      setValidationError('Llena todos los campos, por favor')
      isError = true
    }else if(action === 'add'){
      if(!items.includes(state.item)){
        setValidationError('Tienes que elegir un item de la lista')
        isError = true
      }else if(!reg.test(state.quantity)){
        setValidationError('La cantidad debe ser un numero')
        isError = true
      }else if(!regWithDot.test(state.price)){
        setValidationError('El precio debe ser un numero')
        isError = true
      }
    }
    return isError
  }

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
        <FormControl variant="outlined" className={classes.category}>
          <InputLabel id="category">Categoría</InputLabel>
          <ThemeProvider theme={selectTheme}>
          <Select
            labelId="category"
            value={newProduct.category}
            onChange={(e) => handleChange(e.target.value, "category", 'create')}
            label="Categoría"
            classes={{
              paper: classes.paper,
              option: classes.option,
            }}
          >
          {helpers.globalVariables.productCategories.map((category, i) =>
            <MenuItem key={`key_${i}`} value={category}>{category}</MenuItem>
          )}
          </Select>
        </ThemeProvider>
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
          getOptionSelected={(option, value) => !Object.keys(value).length ? true : option === value}
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
