import React, { useState, useEffect, useMemo } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, Checkbox, Toolbar, Tooltip, IconButton, FormControlLabel, Switch } from '@mui/material';
import { TableHead, TableRow, TableSortLabel, TableContainer, Table, TableBody, TablePagination } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#ff1a75',
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 15,
        color: theme.palette.common.white,
    },
}));

const StyledTableRow = styled(TableRow)(() => ({
    height: '42px',
    '&:hover': {
        backgroundColor: 'rgba(255, 26, 117, 0.1)!important',
    },
    '&:nth-of-type(odd)': {
        backgroundColor: '#262626',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const PinkSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: '#ff1a75',
        '&:hover': {
            backgroundColor: 'rgba(255, 26, 117, 0.1)',
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#ff1a75',
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
        id: 'purchaseDate',
        numeric: false,
        disablePadding: true,
        label: 'Date',
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
        id: 'isLuxury',
        numeric: true,
        disablePadding: false,
        label: 'Luxury',
    },
];

function PurchaseTableHead(props) {

    const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <StyledTableRow>
                <StyledTableCell>
                    <ShoppingCartIcon sx={{ mb: -1 }} />
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
  
PurchaseTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function PurchaseTableToolbar({ numSelected, setDeleteBtnClicked }) {

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

    return (
        <Toolbar
            sx={{
                mt: { md: 1 },
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
                <Typography className="sec-header2"
                    sx={{ flex: '1 1 100%' }}
                    id="tableTitle"
                    component="div"
                >
                    {currentMonthName} Purchases
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={() => setDeleteBtnClicked(true)}>
                        <DeleteIcon
                            sx={{
                                color: '#fff'
                            }}
                        />
                    </IconButton>
                </Tooltip>
            ) : (
                <Box></Box>
            )}
        </Toolbar>
    );
}

PurchaseTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function PurchaseTable({ purchases, setSuccessState, setErrorState }) {

    // State Variables
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('purchaseDate');
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selected, setSelected] = useState([]);
    const [deleteBtnClicked, setDeleteBtnClicked] = useState(false);

    // Use Effects
    useEffect(() => {
        setDeleteBtnClicked(false);
        if (deleteBtnClicked === true) {
            DeleteTableRecords();
            setSelected([]);
        }
    }, [deleteBtnClicked]);

    // Event handlers
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = purchases.map((n) => n.id);
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

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - purchases.length) : 0;

    const visibleRows = useMemo(
        () =>
            stableSort(purchases, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, purchases],
    );

    async function DeleteTableRecords() {

        try {
            // Create bill record
            const response = await axios.post("https://localhost:44379/Purchase/delete-purchases", {
                purchaseIDs: selected
            });

            // Close dialog window
            if (response.status === 200) {
                // console.log('Delete Purchases API call successful');
                setSuccessState('Purchases deleted successfully!');
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
                <PurchaseTableToolbar
                    numSelected={selected.length}
                    setDeleteBtnClicked={setDeleteBtnClicked}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <PurchaseTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={purchases.length}
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
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                                sx={{
                                                    mr: 3,
                                                    color: '#fff',
                                                    '&.Mui-checked': {
                                                        color: '#ff1a75',
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
                                            {row.purchaseDateFormatted}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ color: '#fff' }} align="left">{row.category}</StyledTableCell>
                                        <StyledTableCell sx={{ color: '#fff' }} align="left">{row.description}</StyledTableCell>
                                        <StyledTableCell sx={{ color: '#fff' }} align="right">$ {row.amount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</StyledTableCell>
                                        <StyledTableCell sx={{ color: '#fff' }} align="right">
                                            {row.isLuxury && (
                                                <CheckCircleIcon
                                                    sx={{
                                                        color: '#ff1a75',
                                                        mb: '-4px'
                                                    }}
                                                />
                                            )}
                                        </StyledTableCell>
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
                                    <TableCell colSpan={6} />
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={purchases.length}
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
                control={
                    <PinkSwitch
                        checked={dense}
                        onChange={handleChangeDense}
                    />
                }
                label="Dense padding"
            />
        </Box>
    );
}
