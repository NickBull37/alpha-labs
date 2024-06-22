import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Typography, Paper, Button } from '@mui/material';
import { alphaBull, alphaV, alphaVault, alphaLogo } from '../../../../utils/constants';

const StyledPaper = styled(Paper)(() => ({
    backgroundColor: '#262626',
    display: "flex",
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    boxShadow: "0px 0px 6px 1px rgba(7, 113, 183, 1)",
    '&:hover': {
        boxShadow: "0px 0px 6px 2px rgba(9, 151, 246, 0.8)"
    }
}));

const GradientButton = styled(Button)(() => ({
    minHeight: '30px',
    minWidth: '80px',
    color: '#fff',
    background: 'linear-gradient(to right, #0951aa, #00b3b3)',
    boxShadow: '0px 2px 10px 1px #1a1a1a',
    backgroundColor: '#7e22ce',
    '&:hover': {
        background: 'linear-gradient(to right, #063a79, #008080)',
    },
}));

const DayDetailsHeader = () => {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center"
            sx={{
                zIndex: '100',
                py: 2,
                px: 3,
                backgroundColor: '#1a1a1a',
                boxShadow: '0px 0px 15px 1px #0d0d0d'
            }}
        >
            <Link to="/">
                <StyledPaper>
                    <img src={alphaLogo} height={65}/>
                </StyledPaper>
            </Link>
            <Link to="/calendar-list">
                <GradientButton
                    variant="contained"
                >
                    Calendar
                </GradientButton>
            </Link>
        </Box>
    );
}

export default DayDetailsHeader;