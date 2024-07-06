import React, { useState, useEffect, useMemo } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, Checkbox, Toolbar, Tooltip, Button, IconButton, Alert, Snackbar, FormControlLabel, Switch } from '@mui/material';
import { TableHead, TableRow, TableSortLabel, TableContainer, Table, TableBody, TablePagination } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CheckIcon from '@mui/icons-material/Check';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#1976d2',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: theme.palette.common.white,
    },
}));
  
const StyledTableRow = styled(TableRow)(() => ({
    height: '42px',
    '&:hover': {
        backgroundColor: 'rgba(25, 118, 210, 0.2)!important',
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
        id: 'dueDate',
        numeric: false,
        disablePadding: true,
        label: 'Due Date',
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
        id: 'isAutoPay',
        numeric: true,
        disablePadding: false,
        label: 'Auto Pay',
    },
    {
        id: 'isPaid',
        numeric: true,
        disablePadding: false,
        label: 'Paid',
    },
];
  
function BillsTableHead(props) {

    const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <StyledTableRow>
                <StyledTableCell>
                    <ReceiptLongIcon sx={{ mb: -1 }} />
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
                                    color: '#fff'
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
  
BillsTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
  
function BillsTableToolbar({ numSelected, hasUnbatchedBills, setDeleteBtnClicked }) {

    // Constants
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const currentMonthName = monthNames[currentMonthIndex];

    // State variables
    const [successState, setSuccessState] = useState('');
    const [errorState, setErrorState] = useState('');
    const [successOpen, setSuccessOpen] = useState(false);
    const [failureOpen, setFailureOpen] = useState(false);

    // Event Handlers
    const handleBatchClick = () => {
        RunBillsBatch();
    };

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

    // Use Effects
    useEffect(() => {
        if (successState !== '')
        {
            setSuccessOpen(true);
        }
    }, [successState]);
    useEffect(() => {
        if (errorState !== '')
        {
            setFailureOpen(true);
        }
    }, [errorState]);

    // API Calls
    async function RunBillsBatch() {
        try {
            // Create BillTemplate record
            const response = await axios.get("https://localhost:44379/Bill/batch");

            if (response.status === 200) {
                // console.log('CreateBillTemplate API call successful');
                setSuccessState('Batch job executed successfully!');
            }
        } catch (error) {
            if (error.response) {
                setErrorState(error.response.data.title);
            }
        }
    }

    return (
        <Toolbar
            sx={{
                mt: 2,
                pl: { sm: 2 },
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
                        variant="h4"
                        id="tableTitle"
                        component="div"
                    >
                        {currentMonthName} Bills
                    </Typography>
                    <Button
                        elevation={8}
                        size='small'
                        variant='outlined'
                        disabled={!hasUnbatchedBills}
                        onClick={handleBatchClick}
                        sx={{
                            bgcolor: '#27272a',
                            '&:hover': {
                                backgroundColor: 'rgba(25, 118, 210, 0.2)',
                            },
                            '&:disabled': {
                                color: '#595959',
                                backgroundColor: '#333333',
                            },
                        }}
                    >
                        Batch
                    </Button>
                </Box>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={() => setDeleteBtnClicked(true)}>
                        <DeleteIcon
                            sx={{ color: '#fff' }}
                        />
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

BillsTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    hasUnbatchedBills: PropTypes.bool.isRequired,
};

export default function BillsTable({ hasUnbatchedBills, bills, setSuccessState, setErrorState }) {

    // State Variables
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('dueDate');
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [selected, setSelected] = useState([]);
    const [deleteBtnClicked, setDeleteBtnClicked] = useState(false);

    // Event handlers
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = bills.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {

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

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const handlePayBtnClick = (rowId) => (event) => {
        SetBillPaid(rowId);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bills.length) : 0;

    const visibleRows = useMemo(
        () =>
            stableSort(bills, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, bills],
    );

    // Use Effects
    useEffect(() => {
        console.log(deleteBtnClicked);
        setDeleteBtnClicked(false);
        if (deleteBtnClicked === true) {
            console.log('Delete Button Clicked.');
            console.log(selected);
            DeleteTableRecords();
            setSelected([]);
        }
    }, [deleteBtnClicked]);

    // API Calls
    async function SetBillPaid(rowId) {
        try {
            // Set bill as paid
            const response = await axios.post(`https://localhost:44379/Bill/set-paid?id=${rowId}`);

            if (response.status === 200) {
                setSuccessState("Bill updated successfully!");
            }
        } catch (error) {
            setErrorState(error.response.data.title);
        }
    }

    async function DeleteTableRecords() {

        try {
            // Create bill record
            const response = await axios.post("https://localhost:44379/Bill/delete-bills", {
                billIDs: selected
            });

            // Close dialog window
            if (response.status === 200) {
                // console.log('Delete Bills API call successful');
                setSuccessState('Bills deleted successfully!');
            }
        } catch (error) {
            if (error.response) {
                setErrorState(error.response.data.title);
            }
        }
    }

    return (
        <Box sx={{ width: '100%', mb: 8 }}>
            <Paper elevation={12}
                sx={{
                    width: '100%',
                    backgroundColor: '#3f3f46',
                    color: '#fff',
                }}
            >
                <BillsTableToolbar
                    numSelected={selected.length}
                    hasUnbatchedBills={hasUnbatchedBills}
                    setDeleteBtnClicked={setDeleteBtnClicked}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <BillsTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={bills.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <StyledTableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <StyledTableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                                sx={{
                                                    mr: 3,
                                                    color: '#fff'
                                                }}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.dueDateFormatted}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{row.category}</StyledTableCell>
                                        <StyledTableCell align="left">{row.description}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            {row.hasEstimatedAmount ? (
                                                <>
                                                    <Tooltip title="Estimated value based on the average of previous bills of the same type. Update amount for current month.">
                                                        <span className="subtitle3 color-blue">
                                                            EST&nbsp;&nbsp;
                                                        </span>
                                                    </Tooltip>
                                                    <span>
                                                        $ {row.amount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                                    </span>
                                                </>
                                            ) : (
                                                <span>
                                                    $ {row.amount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                                </span>
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {row.isAutoPay && (
                                                <CheckIcon
                                                    color="primary"
                                                    sx={{
                                                        mb: '-2px'
                                                    }}
                                                />
                                            )}
                                        </StyledTableCell>
                                        <TableCell align="right">
                                            {row.isPaid ? (
                                                <CheckCircleIcon
                                                    sx={{
                                                        color: '#1976d2',
                                                        mb: '-4px'
                                                    }}
                                                />
                                            ) : (
                                                <Button variant='outlined' size='small'
                                                    onClick={handlePayBtnClick(row.id)}
                                                    sx={{
                                                        mr: '-4px',
                                                        minWidth: '50px',
                                                        '&:hover': {
                                                            color: '#fff',
                                                            backgroundColor: '#104d89'
                                                        }
                                                    }}
                                                >
                                                    Pay
                                                </Button>
                                            )}
                                        </TableCell>
                                    </StyledTableRow>
                                );
                            })}
                            <Box></Box>
                            {emptyRows > 0 && (
                                <StyledTableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <StyledTableCell colSpan={6} />
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={bills.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        color: '#fff'
                    }}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );
}
