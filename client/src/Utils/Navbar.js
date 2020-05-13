import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  rootV: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100vh',
  },
  rootH: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabsV: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabsH: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: '1em'
  },
  tabV:{
    marginBottom: '1em',
    color: theme.palette.navbar.links,
    "&.Mui-selected":{
      color: theme.palette.navbar.selectedLink
    }
  },
  tabH: {
    "&.Mui-selected":{
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  },
  vIndicator: {
    backgroundColor: theme.palette.primary.main
  },
  hIndicator: {
    backgroundColor: "rgba(0,0,0,0)"
  }
}));

export default function Navbar(props) {
  const classes = useStyles();
  const history = useHistory()
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    if('links' in props) history.push(`/${props.links[newValue]}`)
    setValue(newValue);
    if('tabChanged' in props) props.tabChanged(newValue)
  };

  return (
    <div className={'layout' in props && props.layout === 'horizontal'? classes.rootH : classes.rootV}>
      <Tabs
        orientation={props.layout || 'vertical'}
        variant={props.variant || 'scrollable'}
        value={value}
        TabIndicatorProps={{
            className: props.layout === 'vertical'? classes.vIndicator : classes.hIndicator
          }}
        onChange={handleChange}
        className={props.layout === 'vertical'? classes.tabsV : classes.tabsH}
      >
      {props.tabs.map((tab, i) =>
        <Tab label={tab} className={props.layout === 'vertical'? classes.tabV : classes.tabH} key={`key_${i}`}/>
      )}
      </Tabs>
    </div>
  )
}
