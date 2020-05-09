import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard.js'
import Groceries from './Groceries/Groceries.js'
import Navbar from './Utils/Navbar.js'
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

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      path: ''
    }
    this.changePath = this.changePath.bind(this)
  }

  changePath(newPath){
    this.setState({path: newPath}, () => console.log(this.state))
  }

  render(){
    const { path } = this.state
    return(
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
  }
}

export default App;
