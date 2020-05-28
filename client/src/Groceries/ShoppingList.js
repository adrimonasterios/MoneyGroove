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


const shoppingHeadCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Item', format: false},
  { id: 'detail', numeric: true, disablePadding: false, label: 'Detalle', format: false},
  { id: 'daysBetweenPurchases', numeric: true, disablePadding: false, label: 'Recurrencia', format: false},
  { id: 'lastPurchase', numeric: true, disablePadding: false, label: 'Ultima Compra', format: helperFunctions.formatDate},
  { id: 'priority', numeric: true, disablePadding: false, label: 'Prioridad', format: false},
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
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
  itemsList: {
    height: '100%',
    width: '65%',
    borderRadius: '4px',
    boxShadow: '0 2px 4px 0 #c5c5e2;',
    backgroundColor: '#fff',
    padding: '2% 2% 3% 2%',
  },
  shoppingList: {
    height: '100%',
    width: '34.5%',
    borderRadius: '4px',
    boxShadow: '0 2px 4px 0 #c5c5e2;',
    backgroundColor: '#fff',
    padding: '2% 2% 3% 2%',
  },
  listContainer: {
    width: '100%',
    height: '85%',
    overflow: 'scroll'
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3% 5%',
    '&:hover':{
      backgroundColor: lighten(theme.palette.primary.light, 0.9),
      color: theme.palette.primary.main
    },
    '&>p': {
      margin: 0
    }
  },
  cancelIcon: {
    color: 'grey',
    cursor: 'pointer',
    "&:hover": {
      color: theme.palette.primary.main
    }
  }
});

class ShoppingList extends React.Component{
  constructor(){
    super();
    this.state = {
      shoppingList: []
    }
    this.addToShoppingList = this.addToShoppingList.bind(this)
  }

  async componentDidMount(){
    this.props.getShoppingListData()
  }

  addToShoppingList(selected){
    const { itemsToShop } = this.props.groceries
    const newShoppingList = this.state.shoppingList.map(i => i)
    itemsToShop.filter(item => selected.includes(item._id)).forEach(item => newShoppingList.push(item))
    this.setState({shoppingList: newShoppingList})
  }

  removeFromShoppingList(selected){
    const newShoppingList = this.state.shoppingList.map(i => i)
    const selectedIndex = newShoppingList.indexOf(selected)
    newShoppingList.splice(selectedIndex, 1)
    this.setState({shoppingList: newShoppingList})
  }

  render(){
    const { classes, groceries } = this.props
    const { shoppingList } = this.state

    return(
      <div className={classes.root}>
        <div className={classes.groceries}>
          <div className={classes.itemsList}>
            <h2 style={{fontWeight: 200, marginTop:0}}>Productos</h2>
            {groceries.itemsToShop.length?
              <Table
                size={570}
                cells='shopping'
                orderBy='priority'
                orderType='asc'
                headCells={shoppingHeadCells}
                items={groceries.itemsToShop}
                shoppingList={shoppingList}
                header='Añade productos a tu lista'
                icons={{
                  add:{
                    function1: this.addToShoppingList
                  }
                }}
                />
              :
              ''
            }
          </div>
          <div className={classes.shoppingList}>
            <h2 style={{fontWeight: 200, marginTop:0}}>Lista de Compra</h2>
            <div className={classes.listContainer}>
              {shoppingList.map((item, i) =>
                <Paper className={classes.listItem} key={`${i}`}>
                  <p>{`- ${item.name} (${item.detail})`}</p>
                  <CancelIcon
                    className={classes.cancelIcon}
                    onClick={e => this.removeFromShoppingList(item)}
                    />
                </Paper>
              )}
            </div>
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
  getShoppingListData: groceriesActions.getShoppingListData,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(ShoppingList)));
