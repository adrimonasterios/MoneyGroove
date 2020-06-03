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
  billsAndProducts: {
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
  productsList:{
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
  },
  addBillPlaceholder:{
    color: theme.palette.callToAction.main,
    textDecoration: 'none',
    fontSize: '18px',
    "&:hover":{
      color: theme.palette.callToAction.intense
    },
    "&:visited":{
      color: theme.palette.callToAction.main,
    }
  },
  item: {
    padding: '3%',
    marginBottom: '1em',
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  management: {
    width: '33.5%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  managementLink: {
    backgroundColor: 'white',
    width: '100%',
    height: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dataBlocks: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    height: '83%',
  },
  generalDataMain: {
    backgroundColor: 'white',
    width: '100%',
    height: '49%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
    marginBottom: '2%'
  },
  generalData: {
    backgroundColor: 'white',
    width: '49%',
    height: '49%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%'
  },
  quantity: {
    fontSize: '3em',
    color: theme.palette.text.secondary
  },
  tag: {
    whiteSpace: 'break-spaces',
    textAlign: 'center',
    color: theme.palette.secondary.main
  }
});

class Groceries extends React.Component{
  constructor(){
    super();
    this.state = {
      generalData: {
        total: {
          quantity: 0,
          tag: 'Total Gastado en el Año'
        },
        products: {
          quantity: 0,
          tag: 'Productos'
        },
        brands: {
          quantity: 0,
          tag: 'Marcas'
        }
      }
    }
  }

  async componentDidMount(){
    await this.props.getBills()
    await this.props.getShoppingListData()
    await this.props.getManagementData()

    let products = await this.props.groceries.managementItems.length
    let brands = await [...new Set(this.props.groceries.managementItems.map(item => item.brand).filter(item => item !== 'N/A'))].length
    let total = 0
    if('datasets' in this.props.groceries.lineChartData &&
      this.props.groceries.lineChartData.datasets.length &&
      this.props.groceries.lineChartData.datasets[0].data.length
    ){
      total = await this.props.groceries.lineChartData.datasets[0].data.reduce((accumulator, current) => accumulator + current)
    }

    let newGeneralData = Object.assign({}, this.state.generalData)
    newGeneralData.products.quantity = products
    newGeneralData.brands.quantity = brands
    newGeneralData.total.quantity = total

    this.setState({generalData: newGeneralData})
  }

  goToBill(bill){
    this.props.history.push({
      pathname: '/compras',
      state: { bill }
    })
  }

  getGeneralData(item, i, classes){
    return (
      <Paper
        className={i === 0? classes.generalDataMain : classes.generalData}
        >
        <span className={classes.quantity}>{i === 0? `${item.quantity} Bs.` : item.quantity}</span>
        <span className={classes.tag}>{item.tag}</span>
      </Paper>
    )
  }

  render(){
    const { classes, groceries } = this.props
    const { generalData } = this.state

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
            <div className={classes.billsAndProducts}>
              <Link to="/compras" className={classes.link}>COMPRAS</Link>
              <div className={classes.billsList}>
                {groceries.bills.length?
                  groceries.bills.reverse().filter((bill, i) => i <= 4).map((bill, i) =>
                  <Paper
                    key={i}
                    className={classes.savedBill}
                    onClick={e => this.goToBill(bill)}
                    >
                    <span style={{marginRight: '1em'}}>{bill.store}</span>
                    <span>{helperFunctions.formatDate(bill.date)}</span>
                  </Paper>
                ) :
                <Link to="/compras" className={classes.addBillPlaceholder}>Haz click aqui para agregar una compra</Link>
              }
              </div>
            </div>
            <div className={classes.management}>
              <Paper className={classes.managementLink}>
                <Link to="/administracion-de-productos" className={classes.link}>ADMINISTRACION</Link>
              </Paper>
              <div className={classes.dataBlocks}>
                {(groceries.managementItems.length && Object.keys(groceries.lineChartData).length)?
                  Object.keys(generalData).map((key, i) =>
                    this.getGeneralData(generalData[key], i, classes)
                  ) : ''
                }
              </div>
            </div>
            <div className={classes.billsAndProducts}>
              <Link to="/proxima-compra" className={classes.link}>PROXIMA COMPRA</Link>
              <div className={classes.productsList}>
                {groceries.itemsToShop.sort((a,b) => a.priority - b.priority).filter((item, i) => i <= 4).map((item, i) =>
                  <Paper
                    key={i}
                    className={classes.item}
                    style={!item.daysBetweenPurchases?
                              {color: 'grey'}:
                              item.priority < 7?
                                {backgroundColor: 'rgba(255, 59, 94, 0.2)'}:
                                item.priority > 14?
                                  {backgroundColor: 'rgba(173, 200, 37, 0.2)'} : {color: 'grey'}}
                    >
                    <span style={{marginRight: '1em'}}>{`${item.name} (${item.detail})`}</span>
                    <span>{item.daysBetweenPurchases? `${item.priority} Dias` : 'N/A'}
                  </span>
                  </Paper>
                )
              }
              </div>
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
  getShoppingListData: groceriesActions.getShoppingListData,
  getManagementData: groceriesActions.getManagementData,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(Groceries)));
