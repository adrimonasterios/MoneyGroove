import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import Landing from '../Landing/Landing.js'
import Dashboard from '../Dashboard/Dashboard.js'
import Groceries from '../Groceries/Groceries.js'
import Navbar from '../Utils/Navbar.js'
// import './styles/main.css'

const pathComponent = [
  {
    path: '/',
    component: Landing
  },
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '/mercado',
    component: Groceries
  },
]

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    display: 'flex',
    width: "100%",
    height: "100%",
    fontFamily: theme.typography.fontFamily
  }
}));


const Routes = (props) => {
  const classes = useStyles();
    return(
      <Router>
        <div className={classes.rootContainer}>
          {window.location.pathname !== '/' &&
            <Navbar
              layout="vertical"
              variant="scrollable"
              links={['home', 'mercado']}
              tabs={['Home', 'Mercado']}
            />}
          {pathComponent.map((p,i) =>
            <Route exact path={`${p.path}`} component={p.component} key={`key_${i}`}/>
          )}
        </div>
      </Router>
    )
  }


export default Routes;
