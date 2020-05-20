import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  registerContainer: {
    width: "70%",
    height: "60%",
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
      height: "50%",
      width: "70%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    }
  },
  titleContainer: {
    height: "20%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    "& p": {
      margin: 0
    }
  },
  submitContainer: {
    height: "20%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around"
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
  },
  error: {
    color: theme.palette.error.main,
    marginBottom: 0
  }
}));


function RegisterForm (props) {
  const classes = useStyles();
  const { register, handleSubmit } = props

  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const handleChange = (value, field) => {
    setState({ ...state, [field]: value });
  };

  return(
    <div className={classes.registerContainer}>
      <div className={classes.titleContainer}>
        <p style={{fontSize: "2em"}}>Registrate</p>
        <p className={classes.text}>Llena el siguiente formulario:</p>
      </div>
      <form>
        <FormControl fullWidth className={classes.name} variant="outlined">
          <InputLabel htmlFor="name">Name</InputLabel>
          <OutlinedInput
          id="name"
          value={state.name}
          onChange={(e) => handleChange(e.target.value, "name")}
          labelWidth={40}
          />
        </FormControl>
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
          type="password"
          onChange={(e) => handleChange(e.target.value, "password")}
          labelWidth={80}
          />
        </FormControl>
        <FormControl fullWidth className={classes.password} variant="outlined">
          <InputLabel htmlFor="password2">Contraseña</InputLabel>
          <OutlinedInput
          id="password2"
          value={state.password2}
          type="password"
          onChange={(e) => handleChange(e.target.value, "password2")}
          labelWidth={80}
          />
        </FormControl>
      </form>
      <p className={classes.error}>{props.error}</p>
      <div className={classes.submitContainer}>
        <p className={classes.text}>
          Ya tienes una cuenta? <span onClick={(e) => register(false)}>Inicia Sesion</span>
      </p>
        <Button variant="contained" className={classes.submit} onClick={(e) => handleSubmit(e, state)}>
          Registrate
        </Button>
      </div>
    </div>
  )
}

export default RegisterForm
