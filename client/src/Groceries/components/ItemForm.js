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
    width: '100%'
  },
  item: {
    width: "25%"
  },
  brand: {
    width: "18%"
  },
  unit: {
    width: "13%"
  },
  quantity: {
    width: "12%"
  },
  amount: {
    width: "15%"
  },
  submit: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
}));


function ItemForm (props) {
  const classes = useStyles();
  const { items, brands, handleSubmit } = props

  const [state, setState] = useState({
    item: '',
    brand: '',
    unit: '',
    quantity: '',
    amount: ''
  });

  const handleChange = (value, field) => {
    setState({ ...state, [field]: value });
  };

  return(
    <form className={classes.form} onSubmit={e => handleSubmit(e, state)} >
      <Autocomplete
        options={items}
        freeSolo={true}
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
      className={classes.brand}
      renderInput={(params) => <TextField {...params}
                                  label="Marca"
                                  variant="outlined"
                                  onChange={(e) => handleChange(e.target.value, "brand")}
                                  />}
      />
      <FormControl variant="outlined" className={classes.unit}>
        <InputLabel id="unit">Unidad</InputLabel>
        <Select
          labelId="unit"
          value={state.measureUnit}
          label="Unidad"
          onChange={(e) => handleChange(e.target.value, "unit")}
          >
            <MenuItem value='gr'>gr</MenuItem>
            <MenuItem value='ml'>ml</MenuItem>
            <MenuItem value='u'>u</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth className={classes.quantity} variant="outlined">
        <InputLabel htmlFor="quantity">Cantidad</InputLabel>
        <OutlinedInput
        id="quantity"
        value={state.quantity}
        onChange={(e) => handleChange(e.target.value, "quantity")}
        labelWidth={60}
        />
      </FormControl>
      <FormControl fullWidth className={classes.amount} variant="outlined">
        <InputLabel htmlFor="amount">Amount</InputLabel>
        <OutlinedInput
        id="amount"
        value={state.amount}
        onChange={(e) => handleChange(e.target.value, "amount")}
        startAdornment={<InputAdornment position="start">Bs.</InputAdornment>}
        labelWidth={60}
        />
      </FormControl>
      <Button variant="contained" className={classes.submit} type="submit">
        <FontAwesomeIcon icon={faPlus} color="white" size="2x"/>
      </Button>
    </form>

  )
}

export default ItemForm
