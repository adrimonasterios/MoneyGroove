import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as authActions from '../app/auth/store/authActions';

class Logout extends Component {

  componentDidMount() {
    const { history } = this.props
    this.props.logoutUser()
    history.push('/home')
  }

  render() {
    return null
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {
  logoutUser: authActions.logoutUser,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout))
