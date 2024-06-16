import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, } from '@mui/material';
import { alphaBull } from '../../../../utils/constants';

const PurchaseHeader = () => {
    
    return (
        <Box display="flex" gap={1}
            sx={{
                py: 2,
                px: 4,
                mb: 4,
                backgroundColor: '#18181b',
            }}
        >
            <Link to="/">
                <Box sx={{ mr: 4 }}>
                    <img src={alphaBull} height={50}/>
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
            <Typography variant='h4'
                sx={{
                    py: 0.5,
                    px: 2,
                    border: '2px solid #ff1a75',
                    borderRadius: '5px'
                }}
            >
                Purchases
            </Typography>
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

export default PurchaseHeader;