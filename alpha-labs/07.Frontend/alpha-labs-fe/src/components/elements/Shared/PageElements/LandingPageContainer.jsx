import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Paper, Stack } from '@mui/material';
import { alphaLogo } from '../../../../utils/constants';

const LandingPageStack = styled(Stack)(() => ({
    height: '100vh',
    width: '100vw',
    display: "flex",
}));

const LandingPageContainer = () => {
    return (
        <LandingPageStack>

        </LandingPageStack>
    );
}

export default LandingPageContainer;