import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';

import * as helperFunctions from '../app/helpers.js';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" style={{background: 'white', borderCollapse: 'collapse'}}>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {props.headCells.map((headCell) => (
          <TableCell
            style={{background: 'white', borderCollapse: 'collapse'}}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    background: "#f1f1f1",
    color: theme.palette.primary.main
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, header, icons } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected > 1? `${numSelected} seleccionados` : `${numSelected} seleccionado`}
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          {header}
        </Typography>
      )}

      {numSelected > 0 && (
        <div style={{display: 'flex'}}>
          {'add' in icons && (
            <Tooltip title="Add">
              <IconButton
                aria-label="add"
                onClick={(e) => {
                  icons.add.function1(props.selected)
                  props.setSelected([])
                }}
                >
                <AddIcon
                  style={{color: "green"}}
                  />
              </IconButton>
            </Tooltip>
          )}
          {'edit' in icons && (
            <Tooltip title="Edit">
              <IconButton
                aria-label="edit"
                onClick={(e) => {
                  icons.edit.function1(props.selected, props.items)
                  props.setSelected([])
                }}
                >
                <EditIcon
                  style={{color: "green"}}
                  />
              </IconButton>
            </Tooltip>
          )}
          {'delete' in icons && (
            <Tooltip title="Delete">
              <IconButton
                aria-label="delete"
                onClick={(e) => {
                  icons.delete.function1(props.selected, props.items)
                  props.setSelected([])
                }}
                >
                <DeleteIcon
                  style={{color: "#ff3b5e"}}
                  />
              </IconButton>
            </Tooltip>
          )}
        </div>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // marginTop: '2em'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    overflow: 'hidden'
  },
  table: {
    minWidth: 400,
    borderCollapse: 'collapse'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  priority: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

export default function Bill(props) {
  const classes = useStyles();
  let { items } = props
  const [order, setOrder] = React.useState(props.orderType);
  const [orderBy, setOrderBy] = React.useState(props.orderBy);
  const [selected, setSelected] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = items.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const getCells = (row, labelId, isItemSelected) => {
    switch(props.cells){
      case 'shopping':
        if(!props.shoppingList.includes(row)){
          return (
            <TableRow
              hover
              onClick={(event) => handleClick(event, row._id)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row._id}
              selected={isItemSelected}
              >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isItemSelected}
                  inputProps={{ 'aria-labelledby': labelId }}
                  />
              </TableCell>
              <TableCell component="th" id={labelId} scope="row" padding="none">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.detail}</TableCell>
              <TableCell align="right">{`${row.daysBetweenPurchases} Dias`}</TableCell>
              <TableCell align="right">{helperFunctions.formatDate(row.lastPurchase)}</TableCell>
              <TableCell align="right"
                        style={!row.daysBetweenPurchases?
                                  {color: 'grey', textDecoration: 'line-through'}:
                                  row.priority < 7?
                                    {color: 'red'}:
                                    row.priority > 14?
                                      {color: 'green'} : {color: 'grey'}}
                  >
                    {`${row.priority} Dias`}
                </TableCell>
              </TableRow>
            )
        }
        break;
      case 'bill':
        return (
          <TableRow
            hover
            onClick={(event) => handleClick(event, row._id)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row._id}
            selected={isItemSelected}
            >
            <TableCell padding="checkbox">
              <Checkbox
                checked={isItemSelected}
                inputProps={{ 'aria-labelledby': labelId }}
                />
            </TableCell>
            <TableCell component="th" id={labelId} scope="row" padding="none">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.brand}</TableCell>
            <TableCell align="right">{row.detail}</TableCell>
            <TableCell align="right">{row.quantity}</TableCell>
            <TableCell align="right">{helperFunctions.formatAmount(row.price)}</TableCell>
          </TableRow>
        )
      case 'management':
        return (
          <TableRow
            hover
            onClick={(event) => handleClick(event, row._id)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row._id}
            selected={isItemSelected}
            >
            <TableCell padding="checkbox">
              <Checkbox
                checked={isItemSelected}
                inputProps={{ 'aria-labelledby': labelId }}
                />
            </TableCell>
            <TableCell component="th" id={labelId} scope="row" padding="none">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.brand}</TableCell>
            <TableCell align="right">{row.detail}</TableCell>
            <TableCell align="right">{'cheapestPrice' in row? helperFunctions.formatAmount(String(row.cheapestPrice)) : 0}</TableCell>
            <TableCell align="right">{'cheapestStore' in row? row.cheapestStore : 'N/A'}</TableCell>
            <TableCell align="right">{'bills' in row? row.bills.length : 0}</TableCell>
          </TableRow>
        )
      default:
        console.log('no cells');
    }
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          setSelected={setSelected}
          items={items}
          header={props.header}
          icons={props.icons}
          />
        <TableContainer style={{maxHeight: props.size}}>
          <Table
            stickyHeader
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={items.length}
              headCells = {props.headCells}
            />
            <TableBody>
              {stableSort(items, getComparator(order, orderBy))
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return getCells(row, labelId, isItemSelected)
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
