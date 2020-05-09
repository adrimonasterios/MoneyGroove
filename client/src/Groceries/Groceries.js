import React from 'react';

import { withStyles } from '@material-ui/styles';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';


const styles = {
  groceries: {
    display: 'flex',
    width: '90%'
  },
  newBill: {
    width: '50%',
    padding: "2% 5%"
  },
  form: {
    display: 'flex',
    justifyContent: "space-between",
    width: '100%'
  },
  item: {
    width: "25%"
  },
  brand: {
    width: "25%"
  },
  unit: {
    width: "15%"
  },
  quantity: {
    width: "15%"
  },
  price: {
    width: "10%"
  },
};

class Groceries extends React.Component{
  constructor(){
    super();
    this.state = {
      measureUnit: '',
      age: 0
    }
  }

  handleChange(e, r){
    console.log(e, r);
  }

  render(){
    const { measureUnit, age } = this.state
    const { classes } = this.props

    return(
      <div className={classes.groceries}>
        <div className={classes.newBill}>
          <form className={classes.form}>
            <FormControl className={classes.item}>
              <InputLabel htmlFor="standard-adornment-password">Item</InputLabel>
              <Input label="Item"/>
            </FormControl>
            <FormControl className={classes.brand}>
              <InputLabel htmlFor="standard-adornment-password">Marca</InputLabel>
              <Input label="Marca"/>
            </FormControl>
            <FormControl className={classes.unit}>
              <InputLabel htmlFor="unit">Unidad</InputLabel>
              <Select
                inputProps={{
                  name: 'unit',
                  id: 'unit',
                }}
                id="unit"
                value={measureUnit}
                onChange={(e,r) => this.handleChange(e,r)}
                >
                <MenuItem value='gr'>gr</MenuItem>
                <MenuItem value='ml'>ml</MenuItem>
                <MenuItem value='u'>u</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.quantity}>
              <InputLabel htmlFor="standard-adornment-password">Cantidad</InputLabel>
              <Input label="Cantidad"/>
            </FormControl>
            <FormControl className={classes.price}>
              <InputLabel htmlFor="standard-adornment-password">Precio</InputLabel>
              <Input
                label="Precio"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
            </FormControl>
          </form>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Groceries);
