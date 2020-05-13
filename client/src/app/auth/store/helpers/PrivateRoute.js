import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import * as authActions from '../authActions';


class PrivateRoute extends React.Component {
  constructor(){
    super();
    this.state = {
      token: ''
    }
  }

  render(){
    const { component: Component, componentProps, auth, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={(props) => auth.isAuthenticated?
          <Component {...componentProps} /> :
          <Redirect to={{pathname: '/home', state: {from: props.location}}} />}
      />
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {
  registerUser: authActions.registerUser,
  loginUser: authActions.loginUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
