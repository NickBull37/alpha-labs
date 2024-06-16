import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, } from '@mui/material';
import { alphaBull } from '../../../../utils/constants';

const DashboardHeader = () => {

    return (
        <Box display="flex" gap={1}
            sx={{
                py: 2,
                px: 4,
                mb: 6,
                backgroundColor: '#18181b'
            }}
        >
            <Link to="/">
                <Box sx={{ mr: 4 }}>
                    <img src={alphaBull} height={50}/>
                </Box>
            </Link>
            <Typography variant='h4'
                sx={{
                    py: 0.5,
                    px: 2,
                    border: '2px solid #7e22ce',
                    borderRadius: '5px'
                }}
            >
                Dashboard
            </Typography>
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

export default DashboardHeader;