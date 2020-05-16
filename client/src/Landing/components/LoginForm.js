import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  loginContainer: {
    width: "70%",
    height: "45%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    "& p": {
      color: theme.palette.secondary.main
    },
    "& $text": {
      color: theme.palette.text.secondary
    },
    "& form": {
      height: "33%",
      width: "70%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    }
  },
  titleContainer: {
    height: "25%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    "& p": {
      margin: 0
    }
  },
  submitContainer: {
    height: "25%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    "&>span": {
      cursor: "pointer",
      transition: "0.3s",
      "&:hover": {
        color: theme.palette.secondary.main
      }
    }
  },
  submit: {
    backgroundImage: `linear-gradient(${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`,
    color: theme.palette.secondary.contrastText,
    fontWeight: '400',
  }
}));


function LoginForm (props) {
  const classes = useStyles();
  const { register, handleSubmit } = props

  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const handleChange = (value, field) => {
    setState({ ...state, [field]: value });
  };

  return(
    <div className={classes.loginContainer}>
      <div className={classes.titleContainer}>
        <p style={{fontSize: "2em"}}>Inicia Sesion</p>
        <p className={classes.text}>Introduce tu email y tu Contraseña</p>
      </div>
      <form>
        <FormControl fullWidth className={classes.email} variant="outlined">
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
          id="email"
          value={state.email}
          onChange={(e) => handleChange(e.target.value, "email")}
          labelWidth={40}
          />
        </FormControl>
        <FormControl fullWidth className={classes.password} variant="outlined">
          <InputLabel htmlFor="password">Contraseña</InputLabel>
          <OutlinedInput
          id="password"
          value={state.password}
          onChange={(e) => handleChange(e.target.value, "password")}
          type="password"
          labelWidth={80}
          />
        </FormControl>
      </form>
      <div className={classes.submitContainer}>
        <p className={classes.text}>
          No tienes una cuenta? <span onClick={(e) => register(true)}>Registrate</span>
      </p>
        <Button variant="contained" className={classes.submit} onClick={(e) => handleSubmit(e, state)}>
          Iniciar Sesion
        </Button>
      </div>
    </div>
  )
}

export default LoginForm
