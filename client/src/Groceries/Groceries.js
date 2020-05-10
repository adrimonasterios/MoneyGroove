import React from 'react';

import ItemForm from './components/ItemForm.js'

import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const styles = theme => ({
  groceries: {
    display: 'flex',
    width: '90%',
    fontFamily: theme.typography.fontFamily
  },
  newBill: {
    width: '60%',
    padding: "2% 5%"
  },
  topForm: {
    display: 'flex',
    justifyContent: "space-between"
  },
  market: {
    width: "65%",
    marginBottom: "2em",
    "& input": {
      fontSize: '2em'
    }
  },
});

class Groceries extends React.Component{
  constructor(){
    super();
    this.state = {
      items: ['item1', 'item2'],
      brands: ['brand1', 'brand2'],
      selectedDate: Date.now(),
      market: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleDateChange(e){
    this.setState({selectedDate: e})
  }

  handleChange(e, field){
    this.setState({[field]: e})
  }

  handleSubmit(e, item){
    e.preventDefault()
    console.log(item);
  }

  render(){
    const { items, brands, selectedDate } = this.state
    const { classes } = this.props

    return(
      <div className={classes.groceries}>
        <div className={classes.newBill}>
          <h1>NUEVO MERCADO</h1>
          <div className={classes.topForm}>
            <Autocomplete
              options={brands}
              freeSolo={true}
              className={classes.market}
              renderInput={(params) => <TextField {...params}
                                          label="Mercado"
                                          onChange={(e) => this.handleChange(e.target.value, "market")}
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
            items={items}
            brands={brands}
            />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Groceries);
