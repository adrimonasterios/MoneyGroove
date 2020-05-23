import React from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import * as groceriesActions from './store/groceriesActions';
import * as helperFunctions from '../app/helpers.js';

// import { Line } from 'react-chartjs-2';

import { withStyles } from '@material-ui/styles';


const styles = theme => ({
  root: {
    width: '90%',
    fontFamily: theme.typography.fontFamily,
    padding: "2%",
    backgroundColor: theme.palette.background
  },
  groceries: {
    display: 'flex',
    borderRadius: '4px',
    boxShadow: '0 2px 4px 0 #c5c5e2;',
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
  },
  lineChart: {
    height: '50%',
    width: '50%'
  }
});

class Groceries extends React.Component{
  constructor(){
    super();
    this.state = {
      period: 'month',
    }
  }

  async componentDidMount(){
    this.props.getBills()
  }

  render(){
    const { classes, groceries } = this.props
    const { period, chartData } = this.state

    return(
      <div className={classes.root}>
        <div className={classes.groceries}>
          <div className={classes.lineChart}>
            {Object.keys(groceries.lineChartData).length?
              <Line
                data={groceries.lineChartData}
                options={{
                  responsive: true
                }}
                />:
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
  getProducts: groceriesActions.getProducts,
  getBills: groceriesActions.getBills,
  clearState: groceriesActions.clearState,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Groceries));
