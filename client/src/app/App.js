import React from 'react';
import Routes from './Router.js'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import moneyGrooveTheme from './theme.config';

class App extends React.Component{
  render(){
    return(
      <MuiThemeProvider theme={moneyGrooveTheme}>
        <Routes/>
      </MuiThemeProvider>
    )
  }
}

export default App;
