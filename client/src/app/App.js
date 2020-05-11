import React from 'react';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import Routes from './Router.js'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import moneyGrooveTheme from './theme.config';

import * as groceriesStore from '../Groceries/store/groceriesReducer'


export const initialState = {
  groceries: groceriesStore.initialState,
}


const reducers = combineReducers({
  groceries: groceriesStore.groceriesReducer,
});

export const store = createStore(
  reducers,
  initialState,
  process.env.NODE_ENV !== 'development' ?
    applyMiddleware(thunk) :
    applyMiddleware(thunk, // lets us dispatch() functions
      // logger //middleware that logs actions
    )
);



class App extends React.Component{
  render(){
    return(
      <Provider store={store}>
        <MuiThemeProvider theme={moneyGrooveTheme}>
          <Routes/>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App;
