import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as groceriesActions from './store/groceriesActions';
import * as helperFunctions from '../app/helpers.js';

import { withStyles } from '@material-ui/styles';
import { lighten } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


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
});

class ShoppingList extends React.Component{
  constructor(){
    super();
    this.state = {
    }
  }

  async componentDidMount(){
    this.props.getShoppingListData()
  }

  render(){
    const { classes } = this.props

    return(
      <div className={classes.root}>
        <div className={classes.groceries}>
          <div className={classes.itemsList}>
            <h2 style={{fontWeight: 200, margin:0}}>Productos</h2>
          </div>
          <div className={classes.shoppingList}>
            <h2 style={{fontWeight: 200, margin:0}}>Lista de Compra</h2>
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
