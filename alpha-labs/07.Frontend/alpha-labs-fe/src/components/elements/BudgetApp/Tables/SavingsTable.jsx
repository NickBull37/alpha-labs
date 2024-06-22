import React, { useState, useEffect, useMemo } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, Toolbar, Tooltip, IconButton, Checkbox, Alert, Snackbar } from '@mui/material';
import { TableHead, TableRow, TableSortLabel, TableContainer, Table, TableBody, TablePagination } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { PaycheckChip, DepositChip, FundChip, LogPaycheckBtn } from '../../../../components';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#00cc7a',
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: theme.palette.common.white,
    },
}));

const StyledTableRow = styled(TableRow)(() => ({
    '&:hover': {
        backgroundColor: 'rgba(0, 204, 122, 0.2)!important',
    },
    '&:nth-of-type(odd)': {
        backgroundColor: '#262626',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
  
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
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
  
const headCells = [
    {
        id: 'date',
        numeric: false,
        disablePadding: true,
        label: 'Date',
    },
    {
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: 'Type',
    },
    {
        id: 'category',
        numeric: false,
        disablePadding: false,
        label: 'Category',
    },
    {
        id: 'description',
        numeric: false,
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'amount',
        numeric: true,
        disablePadding: false,
        label: 'Amount',
    },
    {
        id: 'balance',
        numeric: true,
        disablePadding: false,
        label: 'Balance',
    },
];
  
function SavingsTableHead(props) {

    const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <StyledTableRow>
                <StyledTableCell>
                    <AccountBalanceIcon sx={{ mb: -1 }} />
                </StyledTableCell>
                {headCells.map((headCell) => (
                    <StyledTableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            <Typography className="body1 bolded"
                                sx={{
                                    my: 0.5,
                                }}
                            >
                                {headCell.label}
                            </Typography>
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </StyledTableCell>
                ))}
            </StyledTableRow>
        </TableHead>
    );
}
  
SavingsTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    //onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function SavingsTableToolbar({ numSelected }) {

    // State variables
    const [successState, setSuccessState] = useState('');
    const [errorState, setErrorState] = useState('');
    const [successOpen, setSuccessOpen] = useState(false);
    const [failureOpen, setFailureOpen] = useState(false);

    // Event Handlers
    const handleSuccessClose = (reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSuccessOpen(false);
    };

    const handleFailureClose = (reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setFailureOpen(false);
    };

    return (
        <Toolbar
            sx={{
                mt: { md: 6 },
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Box display="flex" alignItems="center" gap={4}>
                    <Typography className="sec-header2"
                        sx={{ flex: '1 1 100%' }}
                        id="tableTitle"
                        component="div"
                    >
                        Savings Report
                    </Typography>
                    <Box display="flex" sx={{ minWidth: '200px' }}>
                        <LogPaycheckBtn setSuccessState={setSuccessState} setErrorState={setErrorState} />
                    </Box>
                </Box>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon sx={{ color: '#fff' }} />
                    </IconButton>
                </Tooltip>
            ) : (
                <Box></Box>
            )}
            <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleSuccessClose}>
                <Alert
                    onClose={handleSuccessClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {successState}
                </Alert>
            </Snackbar>
            <Snackbar open={failureOpen} autoHideDuration={6000} onClose={handleFailureClose}>
                <Alert
                    onClose={handleFailureClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    ERROR: {errorState}
                </Alert>
            </Snackbar>
        </Toolbar>
    );
}
SavingsTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
  
export default function SavingsTable({ funds, tableRecords }) {

    // State Variables
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('date');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Event handlers
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleCheckboxClick = (event, id) => {

        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1)
        {
            newSelected = newSelected.concat(selected, id);
        }
        else if (selectedIndex === 0)
        {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if (selectedIndex === selected.length - 1)
        {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if (selectedIndex > 0)
        {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableRecords.length) : 0;

    const visibleRows = useMemo(
        () =>
        stableSort(tableRecords, getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        ),
        [order, orderBy, page, rowsPerPage, tableRecords],
    );

    // Use Effects
    // useEffect(() => {
        
    // }, []);

    return (
        <Box sx={{ width: '100%', mb: 8 }}>
            <Paper elevation={12}
                sx={{
                    width: '100%',
                    backgroundColor: '#3f3f46',
                    color: '#fff',
                }}
            >
                <SavingsTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <SavingsTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={tableRecords.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <StyledTableRow
                                        hover
                                        onClick={(event) => handleCheckboxClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <StyledTableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                                sx={{
                                                    mr: 3,
                                                    color: '#fff',
                                                    '&.Mui-checked': {
                                                        color: '#00cc7a',
                                                    },
                                                }}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                            sx={{
                                                color:'#fff',
                                            }}
                                        >
                                            {row.date}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ color: '#fff' }} align="left">
                                            {row.type === 'Fund' && (
                                                <FundChip />
                                            )}
                                            {row.type === 'FundUpdate' && (
                                                <FundChip />
                                            )}
                                            {row.type === 'Transaction' && (
                                                <DepositChip />
                                            )}
                                            {row.type === 'Paycheck' && (
                                                <PaycheckChip />
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ color: '#fff' }} align="left">{row.category}</StyledTableCell>
                                        <StyledTableCell sx={{ color: '#fff' }} align="left">{row.description}</StyledTableCell>
                                        <StyledTableCell sx={{ color: '#fff' }} align="right">$ {row.amount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</StyledTableCell>
                                        <StyledTableCell sx={{ color: '#fff' }} align="right">
                                            {row.balance === null && (
                                                <Typography className="subtitle1 ls-100 color-gray400">
                                                    n/a
                                                </Typography>
                                            )}
                                            {row.balance !== null && (
                                                <Typography fontSize='14px'>${row.balance.toFixed(2)}</Typography>
                                            )}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                            <Box></Box>
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={tableRecords.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        color: '#fff'
                    }}
                />
            </Paper>
        </Box>
    );
}
