import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Paper, Stack } from '@mui/material';
import { alphaLogo } from '../../../../utils/constants';

const PageContainerStack = styled(Stack)(() => ({
    height: '100vh',
    maxHeight: '104px',
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
    boxShadow: "0px 0px 6px 1px rgba(0, 255, 0, 0.7)",
    '&:hover': {
        boxShadow: "0px 0px 6px 2px rgba(0, 255, 0, 1)"
    }
}));

const PageContainer = () => {
    return (
        <div>PageContainer</div>
    );
}

export default PageContainer;