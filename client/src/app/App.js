import React from 'react';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import setAuthToken from "./auth/store/helpers/setAuthToken";
import Routes from './Router.js'

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import moneyGrooveTheme from './theme.config';

import * as authActions from './auth/store/authActions';
import * as authStore from './auth/store/authReducer'
import * as groceriesStore from '../Groceries/store/groceriesReducer'


export const initialState = {
  auth: authStore.initialState,
  groceries: groceriesStore.initialState,
}


const reducers = combineReducers({
  auth: authStore.authReducer,
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
