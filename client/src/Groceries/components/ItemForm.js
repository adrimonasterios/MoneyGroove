import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
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
    width: "25%",
  },
  brand: {
    width: "18%",
    "&.MuiAutocomplete-option": {
        background: 'white'
      }
  },
  quantity: {
    width: "12%"
  },
  detail: {
    width: "16%"
  },
  price: {
    width: "14%"
  },
  submit: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    margin: '5px 0',
    "&:hover": {
      backgroundColor: theme.palette.secondary.intense,
    }
  },
  // option: {
  //   backgroundColor: 'white'
  //
  // },
  paper: {
    backgroundColor: 'white'
  }
}));


function ItemForm (props) {
  const classes = useStyles();
  const { items, brands, handleSubmit } = props

  const [state, setState] = useState({
    item: '',
    brand: '',
    detail: '',
    quantity: '',
    price: ''
  });

  const handleChange = (value, field) => {
    console.log('changed');
    console.log(value);
    setState({ ...state, [field]: value });
  };

  return(
    <form className={classes.form} onSubmit={e => handleSubmit(e, state)} >
      <Autocomplete
        options={items}
        freeSolo={true}
        classes={{
            paper: classes.paper,
            option: classes.option,
          }}
        onChange={(e) => handleChange(items[e.target.value], "item")}
        className={classes.item}
        renderInput={(params) => <TextField {...params}
                                    label="Item"
                                    variant="outlined"
                                    onChange={(e) => handleChange(e.target.value, "item")}
                                  />}
      />
      <Autocomplete
        options={brands}
        freeSolo={true}
        classes={{
            paper: classes.paper,
          }}
        className={classes.brand}
        onChange={(e) => handleChange(brands[e.target.value], "brand")}
        renderInput={(params) => <TextField {...params}
                                    label="Marca"
                                    variant="outlined"
                                    onChange={(e) => handleChange(e.target.value, "brand")}
                                    />}
      />
    <FormControl fullWidth className={classes.quantity} variant="outlined">
      <InputLabel htmlFor="quantity">Cantidad</InputLabel>
      <OutlinedInput
        id="quantity"
        value={state.quantity}
        onChange={(e) => handleChange(e.target.value, "quantity")}
        labelWidth={60}
        />
      </FormControl>
      <FormControl fullWidth className={classes.detail} variant="outlined">
        <InputLabel htmlFor="detail">Detalle</InputLabel>
        <OutlinedInput
          id="detail"
          value={state.detail}
          onChange={(e) => handleChange(e.target.value, "detail")}
          labelWidth={60}
          />
      </FormControl>
      <FormControl fullWidth className={classes.price} variant="outlined">
        <InputLabel htmlFor="price">Precio</InputLabel>
        <OutlinedInput
        id="price"
        value={state.price}
        onChange={(e) => handleChange(e.target.value, "price")}
        startAdornment={<InputAdornment position="start">Bs.</InputAdornment>}
        labelWidth={60}
        />
      </FormControl>
      <Button variant="contained" size="small" className={classes.submit} type="submit">
        Insertar
      </Button>
    </form>

  )
}

export default ItemForm


// <FontAwesomeIcon icon={faPlus} color="white" size="2x"/>
