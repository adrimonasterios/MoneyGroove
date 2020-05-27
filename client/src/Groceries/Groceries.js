import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { Line, Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom'
import * as groceriesActions from './store/groceriesActions';
import * as helperFunctions from '../app/helpers.js';

import { withStyles } from '@material-ui/styles';
import { lighten } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


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
  chartContainer: {
    height: '100%',
    width: '49.5%',
    borderRadius: '4px',
    boxShadow: '0 2px 4px 0 #c5c5e2;',
    backgroundColor: '#fff',
    padding: '2% 2% 3% 2%',
  },
  chart: {
    height: '85%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  chartTitle: {
    color: theme.palette.text.disabled,
    fontSize: '18px',
    textAlign: 'center',
    marginTop: 0
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
  billsList:{
    width: '80%',
    height: '100%',
    paddingTop: '2em'
  },
  savedBill: {
    padding: '3%',
    marginBottom: '1em',
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-between',
    transition: '0.3',
    cursor: "pointer",
    width: '100%',
    "&:hover":{
      backgroundColor: lighten(theme.palette.primary.light, 0.9),
      color: theme.palette.primary.main
    }
  },
  link:{
    color: theme.palette.text.disabled,
    textDecoration: 'none',
    fontSize: '18px',
    "&:hover":{
      color: theme.palette.text.secondary
    },
    "&:visited":{
      color: theme.palette.text.disabled
    }
  }
});

class Groceries extends React.Component{
  constructor(){
    super();
    this.state = {

    }
  }

  async componentDidMount(){
    this.props.getBills()
  }

  goToBill(bill){
    this.props.history.push({
      pathname: '/compras',
      state: { bill }
    })
  }

  render(){
    const { classes, groceries } = this.props
    const { selectedBill } = this.state
    console.log(groceries);

    return(
      <div className={classes.root}>
        <div className={classes.groceries}>
          <div className={classes.charts}>
            <div className={classes.chartContainer}>
              <p className={classes.chartTitle}>MONTO DE COMPRAS POR MES</p>
              <div className={classes.chart}>
                {Object.keys(groceries.lineChartData).length?
                  <Line
                    data={groceries.lineChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      legend: {
                        display: false
                      }
                    }}
                    />:
                    ''
                  }
              </div>
            </div>
            <div className={classes.chartContainer}>
              <p className={classes.chartTitle}>GASTO POR CATEGORIAS</p>
              <div className={classes.chart}>
                {Object.keys(groceries.doughnutChartData).length?
                  <Doughnut
                    data={groceries.doughnutChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      legend: {
                        position: 'right'
                      }
                    }}
                    />:
                    ''
                  }
              </div>
            </div>
          </div>

          <div className={classes.sections}>
            <div className={classes.bills}>
              <Link to="/compras" className={classes.link}>COMPRAS</Link>
              <div className={classes.billsList}>
                {groceries.bills.reverse().filter((bill, i) => i <= 4).map((bill, i) =>
                  <Paper
                    key={i}
                    className={classes.savedBill}
                    onClick={e => this.goToBill(bill)}
                    >
                    <span style={{marginRight: '1em'}}>{bill.store}</span>
                    <span>{helperFunctions.formatDate(bill.date)}</span>
                  </Paper>
                )
              }
              </div>
            </div>
            <div className={classes.bills}>
              PRODUCTOS
            </div>
            <div className={classes.bills}>
              <Link to="/proxima-compra" className={classes.link}>PROXIMA COMPRA</Link>
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(Groceries)));

// title:{
//   display: true,
//   text: 'MONTO DE COMPRAS POR MES',
//   fontSize: '18',
//   fontColor: 'rgba(0, 0, 0, 0.38)'
// },
