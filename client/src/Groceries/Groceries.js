import React from 'react';
import { connect } from 'react-redux';
import { Line, Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom'
import * as groceriesActions from './store/groceriesActions';
import * as helperFunctions from '../app/helpers.js';

// import { Line } from 'react-chartjs-2';

import { withStyles } from '@material-ui/styles';


const styles = theme => ({
  root: {
    width: '90%',
    fontFamily: theme.typography.fontFamily,
    padding: "1em",
    backgroundColor: theme.palette.background
  },
  groceries: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
  charts: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '49%',
    width: '100%'
  },
  chart: {
    height: '100%',
    width: '49.5%',
    borderRadius: '4px',
    boxShadow: '0 2px 4px 0 #c5c5e2;',
    backgroundColor: '#fff',
    padding: '2% 2% 3% 2%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  chartTitle: {
    color: theme.palette.text.disabled,
    fontSize: '18px'
  },
  sections: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '49%',
    width: '100%'
  },
  bills: {
    height: '100%',
    width: '32.5%',
    borderRadius: '4px',
    boxShadow: '0 2px 4px 0 #c5c5e2;',
    backgroundColor: '#fff',
    padding: '2% 2% 3% 2%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
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
    console.log(groceries.doughnutChartData);

    return(
      <div className={classes.root}>
        <div className={classes.groceries}>
          <div className={classes.charts}>
            <div className={classes.chart}>
              <p className={classes.chartTitle}>MONTO DE COMPRAS POR MES</p>
              {Object.keys(groceries.lineChartData).length?
                <Line
                  data={groceries.lineChartData}
                  options={{
                    responsive: true,
                    legend: {
                      display: false
                    }
                  }}
                  />:
                  ''
                }

            </div>
            <div className={classes.chart}>
              <p className={classes.chartTitle}>GASTO POR CATEGORIAS</p>
              {Object.keys(groceries.doughnutChartData).length?
                <Doughnut
                  data={groceries.doughnutChartData}
                  options={{
                    responsive: true,
                    legend: {
                      position: 'right'
                    }
                  }}
                  />:
                  ''
                }
            </div>
          </div>

          <div className={classes.sections}>
            <div className={classes.bills}>
              <Link to="/compras">COMPRAS</Link>
            </div>
            <div className={classes.bills}>
              PRODUCTOS
            </div>
            <div className={classes.bills}>
              PROXIMA LISTA
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
  getProducts: groceriesActions.getProducts,
  getBills: groceriesActions.getBills,
  clearState: groceriesActions.clearState,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Groceries));
