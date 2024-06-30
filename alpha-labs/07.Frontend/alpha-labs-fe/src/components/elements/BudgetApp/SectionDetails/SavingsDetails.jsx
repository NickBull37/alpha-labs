import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Stack, Paper, IconButton, Typography, Alert, Snackbar, Button, Menu, MenuItem } from '@mui/material';
import { DepositFundsBtn } from '../../../../components';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const StyledPaper = styled(Paper)(() => ({
    backgroundColor: '#3f3f46',
    color: '#fff',
    minWidth: '230px'
}));

const SavingsDetails = () => {

    const navigate = useNavigate();

    // State variables
    const [funds, setFunds] = useState([]);
    const [successState, setSuccessState] = useState('');
    const [errorState, setErrorState] = useState('');
    const [successOpen, setSuccessOpen] = useState(false);
    const [failureOpen, setFailureOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);

    // Use Effects
    useEffect(() => {
        GetFundNodes();
    }, []);

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
    
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    // API Calls
    async function GetFundNodes() {
        try {
            // Get fund nodes data
            const response = await axios.get("https://localhost:44379/Fund/nodes");

            if (response.status === 200) {
                setFunds(response.data);
            }
        } catch (error) {
            alert(error);
        }
    }

    async function DeleteFund(activeFundID) {
        try {
            // Delete fund
            const response = await axios.post(`https://localhost:44379/Fund/delete-fund?id=${activeFundID}`);

            if (response.status === 200) {
                navigate("/funds");
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <Box>
            <Box display="flex" justifyContent="flex-start" gap={3}
                sx={{
                    p: 2,
                    mb: 2,
                    border: '2px solid #00cc7a',
                    borderRadius: '5px',
                    backgroundColor: 'rgba(0, 204, 122, 0.05)'
                }}
            >
                {funds.map((fund) => (
                    <StyledPaper elevation={8} key={fund.id}
                        sx={{
                            py: 1,
                            pl: 2,
                            pr: 1.5
                        }}
                    >
                        <Stack display="flex" sx={{ minWidth: '100%!important' }}>
                            <Box
                                display="flex"
                                justifyContent="flex-end"
                                alignItems="center"
                                sx={{
                                    mb: 1,
                                    minWidth: '210px'
                                }}
                            >
                                <Typography className="sec-header3"
                                    flexGrow={1}
                                >
                                    {fund.name}
                                </Typography>
                                <IconButton
                                    id="menu-icon-button"
                                    aria-controls={menuOpen ? 'fund-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={menuOpen ? 'true' : undefined}
                                    onClick={handleClickMenu}
                                >
                                    <MoreHorizIcon sx={{ color: '#fff' }} />
                                </IconButton>
                                <Menu
                                    id="fund-menu"
                                    anchorEl={anchorEl}
                                    open={menuOpen}
                                    onClose={handleCloseMenu}
                                    MenuListProps={{
                                        'aria-labelledby': 'menu-icon-button',
                                    }}
                                >
                                    <MenuItem disabled onClick={handleCloseMenu}>Deposit Funds</MenuItem>
                                    <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>
                                </Menu>
                            </Box>
                            <Box display="flex" sx={{ ml: -0.5 }}>
                                <DepositFundsBtn fund={fund} setSuccessState={setSuccessState} setErrorState={setErrorState} />
                            </Box>
                            <Typography className="subtitle2">
                                    <span className="color-gray200">
                                        Deposits:
                                    </span>
                                    &nbsp;&nbsp;
                                    <span className="body1">
                                        {fund.depositCount}
                                    </span>
                                </Typography>
                            <Typography className="subtitle2">
                                <span className="color-gray200">
                                    Current Balance:
                                </span>
                                &nbsp;&nbsp;
                                <span className="body1 green-txt">
                                    ${fund.balance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                </span>
                            </Typography>
                        </Stack>
                    </StyledPaper>
                ))}
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
            </Box>
            {/* <AddFundBtn setSuccessState={setSuccessState} setErrorState={setErrorState} /> */}
        </Box>
    );
}

export default SavingsDetails;