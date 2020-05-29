import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as groceriesActions from './store/groceriesActions';
import * as helperFunctions from '../app/helpers.js';

import Table from '../Utils/Table'

import { withStyles } from '@material-ui/styles';
import { lighten } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';


const managementHeadCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Item', format: false},
  { id: 'brand', numeric: true, disablePadding: false, label: 'Marca', format: false},
  { id: 'detail', numeric: true, disablePadding: false, label: 'Detalle', format: false},
  { id: 'cheapestPrice', numeric: true, disablePadding: false, label: 'Mas barato', format: false},
  { id: 'cheapestStore', numeric: true, disablePadding: false, label: 'Mercado', format: false},
  { id: 'bills', numeric: true, disablePadding: false, label: 'Compras', format: false},
]


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
  }
});

class ProductManagement extends React.Component{
  constructor(){
    super();
    this.state = {

    }
  }

  async componentDidMount(){
    this.props.getManagementData()
  }

  render(){
    const { classes, groceries } = this.props

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
                    function1: this.addToShoppingList
                  }
                }}
                />
              :
              ''
            }
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
  getManagementData: groceriesActions.getManagementData
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductManagement)));
