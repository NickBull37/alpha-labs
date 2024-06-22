import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Typography, Paper } from '@mui/material';
import { alphaLogo } from '../../../../utils/constants';

const StyledPaper = styled(Paper)(() => ({
    backgroundColor: '#262626',
    display: "flex",
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    boxShadow: "0px 0px 6px 1px rgba(172, 0, 230, 1)",
    '&:hover': {
        boxShadow: "0px 0px 6px 2px rgba(172, 0, 230, 0.8)"
    }
}));

const SavingsHeader = () => {

    return (
        <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            gap={1}
            sx={{
                pt: 2,
                pb: 2,
                pl: 3,
                pr: 4,
                backgroundColor: '#1a1a1a',
                boxShadow: '0px 0px 15px 2px #0d0d0d'
            }}
        >
            <Link to="/">
                <StyledPaper>
                    <img src={alphaLogo} height={65}/>
                </StyledPaper>
            </Link>
            <Box flexGrow={1}></Box>
            <Link to="/budget-dashboard" className="no-deco">
                <Typography variant='h4'
                    sx={{
                        py: 0.5,
                        px: 2,
                        border: '2px solid #18181b',
                        borderRadius: '5px',
                        color: '#fff'
                    }}
                >
                    Dashboard
                </Typography>
            </Link>
            <Link to="/budget-purchases" className="no-deco">
                <Typography variant='h4'
                    sx={{
                        py: 0.5,
                        px: 2,
                        border: '2px solid #18181b',
                        borderRadius: '5px',
                        color: '#fff'
                    }}
                >
                    Purchases
                </Typography>
            </Link>
            <Link to="/budget-bills" className="no-deco">
                <Typography variant='h4'
                    sx={{
                        py: 0.5,
                        px: 2,
                        border: '2px solid #18181b',
                        borderRadius: '5px',
                        color: '#fff'
                    }}
                >
                    Bills
                </Typography>
            </Link>
            <Typography variant='h4'
                sx={{
                    py: 0.5,
                    px: 2,
                    border: '2px solid #00cc7a',
                    borderRadius: '5px',
                    color: '#fff'
                }}
            >
                Savings
            </Typography>
        </Box>
    );
}

export default SavingsHeader;