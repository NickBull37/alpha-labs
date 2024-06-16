import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, } from '@mui/material';
import { alphaBull, alphaV, alphaVault } from '../../../../utils/constants';

const LandingHeader = () => {
    return (
        <Box display="flex" gap={1}
            sx={{
                py: 2,
                px: 4,
                backgroundColor: '#1a1a1a',
            }}
        >
            <Link to="/">
                <Box sx={{ mr: 2 }}>
                    <img src={alphaVault} height={50}/>
                </Box>
            </Link>
        </Box>
    );
}

export default LandingHeader;