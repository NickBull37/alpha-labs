import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { alphaVault } from '../../../../utils/constants';

const BillHeader = () => {

    return (
        <Box display="flex" gap={1}
            sx={{
                py: 2,
                px: 4,
                mb: 4,
                backgroundColor: '#18181b'
            }}
        >
            <Link to="/">
                <Box sx={{ mr: 4 }}>
                    <img src={alphaVault} height={50}/>
                </Box>
            </Link>
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
            <Typography variant='h4'
                sx={{
                    py: 0.5,
                    px: 2,
                    border: '2px solid #1976d2',
                    borderRadius: '5px'
                }}
            >
                Bills
            </Typography>
            <Link to="/budget-savings" className="no-deco">
                <Typography variant='h4'
                    sx={{
                        py: 0.5,
                        px: 2,
                        border: '2px solid #18181b',
                        borderRadius: '5px',
                        color: '#fff'
                    }}
                >
                    Savings
                </Typography>
            </Link>
        </Box>
    );
}

export default BillHeader;