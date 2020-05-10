import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard.js'
import Groceries from '../Groceries/Groceries.js'
import Navbar from '../Utils/Navbar.js'
// import './styles/main.css'

const pathComponent = [
  {
    path: '/home',
    component: Dashboard
  },
  {
    path: '/mercado',
    component: Groceries
  },
]


const Routes = () => (
      <Router>
        <div style={{display: 'flex'}}>
          <Navbar
            layout="vertical"
            variant="scrollable"
            links={['home', 'mercado']}
            tabs={['Home', 'Mercado']}
            />
          {pathComponent.map((p,i) =>
            <Route exact path={`${p.path}`} component={p.component} key={`key_${i}`}/>
          )}
        </div>
      </Router>
    )


export default Routes;
