import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/styles';

import * as authActions from './auth/store/authActions';

import Landing from '../Landing/Landing.js'
import Dashboard from '../Dashboard/Dashboard.js'
import Groceries from '../Groceries/Groceries.js'
import Bills from '../Groceries/Bills.js'
import Navbar from '../Utils/Navbar.js'
import Logout from '../Utils/Logout.js'
import PrivateRoute from './auth/store/helpers/PrivateRoute.js'



const styles = theme => ({
  rootContainer: {
    display: 'flex',
    width: "100%",
    height: "100%",
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.primary,
  }
});

const navbarPaths = [
  {
    link: 'dashboard',
    tab: 'Dashboard'
  },
  {
    link: 'mercado',
    tab: 'Mercado'
  },
  {
    link: 'logout',
    tab: 'Cerrar Sesion'
  },
]


class Routes extends React.Component{

  render(){
    const { classes, auth } = this.props
    const navbarLinks = navbarPaths.map(n => n.link)
    const navbarTabs = navbarPaths.map(n => n.tab)
    let currentPathIndex = 0
    if(localStorage.getItem('navbarPath')){
      let currentPath = localStorage.getItem('navbarPath').split('')
      currentPath.splice(0,1)
      currentPath = currentPath.join('')
      currentPathIndex = navbarLinks.indexOf(currentPath)
      if(currentPathIndex < 0) currentPathIndex = 0
    }



    return(
      <Router>
        <div className={classes.rootContainer}>
          <Redirect exact from="/" to="/home"/>
          {auth.isAuthenticated?
            <Route path="/" render={() => <Navbar
                                            layout="vertical"
                                            variant="scrollable"
                                            links={navbarLinks}
                                            tabs={navbarTabs}
                                            currentPath={currentPathIndex}
                                            />}/>
                                          : ''}

          <PrivateRoute path="/dashboard" component={Dashboard}/>
          <PrivateRoute path="/mercado" component={Groceries}/>
          <PrivateRoute path="/compras" component={Bills}/>

          <Route exact path="/home" component={Landing}/>
          <Route exact path="/logout" render={() => <Logout logoutUser={this.props.logoutUser}/>}/>
        </div>
      </Router>
    )
  }
}


  const mapStateToProps = state => ({
    auth: state.auth,
  })

  const mapDispatchToProps = {
    logoutUser: authActions.logoutUser,
    authenticateUser: authActions.authenticateUser
  }

  export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Routes))
