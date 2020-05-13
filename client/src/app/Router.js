import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { withStyles } from '@material-ui/styles';

import * as authActions from './auth/store/authActions';

import Landing from '../Landing/Landing.js'
import Dashboard from '../Dashboard/Dashboard.js'
import Groceries from '../Groceries/Groceries.js'
import Navbar from '../Utils/Navbar.js'
import Logout from '../Utils/Logout.js'
import PrivateRoute from './auth/store/helpers/PrivateRoute.js'
// import './styles/main.css'


const styles = theme => ({
  rootContainer: {
    display: 'flex',
    width: "100%",
    height: "100%",
    fontFamily: theme.typography.fontFamily
  }
});


class Routes extends React.Component{
  async componentDidMount(){
  }


  render(){
    const { classes, auth } = this.props

    return(
      <Router>
        <div className={classes.rootContainer}>
          <Redirect from="/" to="/home"/>
          {auth.isAuthenticated?
            <Route path="/" render={() => <Navbar
                                            layout="vertical"
                                            variant="scrollable"
                                            links={['dashboard', 'mercado', 'logout']}
                                            tabs={['Panel', 'Mercado', 'Cerrar Sesion']}
                                            />}/>
                                          : ''}
          <PrivateRoute
            exact
            path="/dashboard"
            component={Dashboard}

            />
          <PrivateRoute
            exact
            path="/mercado"
            component={Groceries}

            />
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
