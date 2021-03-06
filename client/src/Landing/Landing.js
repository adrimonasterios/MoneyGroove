import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import * as authActions from '../app/auth/store/authActions';

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Logo from '../Utils/Logo'

import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  landing: {
    width: "100%",
    height:"100%",
    display: "flex"
  },
  gradient: {
    height: '100%',
    width: '65%',
    background: "radial-gradient(circle, rgba(59,41,152,1) 0%, rgba(77,46,168,1) 47%, rgba(139,62,223,1) 100%)",
    backgroundBlendMode: "multiply",
    display: "flex",
    alignItems: "center"
  },
  gradientImage: {
    backgroundImage: 'url("home-img.jpg")',
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
    opacity: "0.05",
    filter: "contrast(200%) grayscale(1)"
  },
  logo: {
    marginTop: '500px'
  },
  homeText: {
    position: "absolute",
    marginLeft: "10%",
    display:'flex',
    flexDirection: 'column',
    "& *": {
      color: theme.palette.primary.contrastText,
      fontWeight: "200"
    }
  },
  formContainer: {
    width: "35%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
});

class Landing extends React.Component{
  constructor(){
    super();
    this.state = {
      registration: false,
      errors: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.register = this.register.bind(this)
  }

  componentDidMount(){

    const token = localStorage.getItem('jwtToken')
    const routerState = this.props.location.state
    const previousPath = (routerState && 'from' in routerState) && routerState.from
    const authenticatedRoute = previousPath? previousPath.pathname : '/dashboard'
    localStorage.setItem('navbarPath', authenticatedRoute)

    token && this.props.authenticateUser(token).then(res =>{
      this.props.history.push(authenticatedRoute)
    } )
  }

  handleChange(e, field){
    this.setState({[field]: e})
  }

  register(bool){
    this.setState({registration: bool})
  }

  async handleSubmit(e, state){
    e.preventDefault()
    const { history } = this.props
    'name' in state?
      await this.props.registerUser(state, history) :
      await this.props.loginUser(state, history)
  }

  render(){
    const { registration } = this.state
    const { classes, auth } = this.props
    // if(localStorage.jwtToken) this.props.history.push('/dashboard')

    return(
      <div className={classes.landing}>
        <div className={classes.gradient}>
          <div className={classes.gradientImage}>
          </div>
          <div className={classes.homeText}>
            <Logo
              logoStyle={{height:"160px"}}
              pathStyle={{fill:"rgba(255,255,255,0.5)"}}
              />
            <p style={{fontSize: '4em'}}>Money Groove</p>
            <p style={{fontSize: '1.5em'}}>Manejo de Finanzas Personales</p>
          </div>
        </div>
        <div className={classes.formContainer}>
          {registration?
            <RegisterForm
              handleSubmit={this.handleSubmit}
              register={this.register}
              error={auth.error}
              /> :
            <LoginForm
              handleSubmit={this.handleSubmit}
              register={this.register}
              error={auth.error}
              />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  landing: state.landing,
  auth: state.auth
})

const mapDispatchToProps = {
  registerUser: authActions.registerUser,
  loginUser: authActions.loginUser,
  authenticateUser: authActions.authenticateUser
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(Landing)));
