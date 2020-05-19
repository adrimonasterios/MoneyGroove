import React from 'react'
import { makeStyles, lighten } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  placeholder: {
    width: '100%',
    height: '100%',
    padding:'80px 24px',
    display: "flex",
    justifyContent: "center",
    "&>p":{
      fontSize: '2em',
      color: lighten(theme.palette.text.disabled, 0.5),
      fontWeight: 'bold',
      textAlign: 'center'
    }
  },
}));

export default function Placeholder(props) {
  const classes = useStyles();

  return (
    <div className={classes.placeholder}>
      {props.children}
    </div>
  )
}
