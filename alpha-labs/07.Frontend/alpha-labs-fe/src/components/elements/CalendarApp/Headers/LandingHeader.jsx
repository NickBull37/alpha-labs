import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Typography, Paper } from '@mui/material';
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

const LandingHeader = () => {
    return (
        <Box display="flex" gap={1}
            sx={{
                pt: 2,
                pb: 2,
                px: 3,
                backgroundColor: '#1a1a1a',
            }}
        >
            <Link to="/">
                <StyledPaper>
                    <img src={alphaLogo} height={65}/>
                </StyledPaper>
            </Link>
        </Box>
    );
}

export default LandingHeader;