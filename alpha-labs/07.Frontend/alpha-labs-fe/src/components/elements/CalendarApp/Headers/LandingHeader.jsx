import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';
import { alphaLogo } from '../../../../utils/constants';

const HeaderBox = styled(Box)(() => ({
    height: '15vh',
    width: '100vw',
    display: "flex",
    padding: '16px 24px',
    backgroundColor: '#1a1a1a',
    boxShadow: '0px 0px 15px 2px #0d0d0d',
    zIndex: '100',
}));

const StyledPaper = styled(Paper)(() => ({
    backgroundColor: '#262626',
    display: "flex",
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    boxShadow: "0px 0px 6px 1px rgba(25, 118, 210, 0.8)",
    '&:hover': {
        boxShadow: "0px 0px 10px 2px rgba(25, 118, 210, 0.8)"
    }
}));

const LandingHeader = () => {
    return (
        <HeaderBox>
            <Link to="/">
                <StyledPaper>
                    <img src={alphaLogo} height={65}/>
                </StyledPaper>
            </Link>
        </HeaderBox>
    );
}

export default LandingHeader;