import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, } from '@mui/material';
import { alphaVault } from '../../../../utils/constants';

const SavingsHeader = () => {

    return (
        <Box display="flex" gap={1}
            sx={{
                py: 2,
                px: 4,
                mb: 4,
                backgroundColor: '#18181b'
            }}
        >
            <Box sx={{ mr: 4 }}>
                <img src={alphaVault} height={50}/>
            </Box>
            <Link to="/dashboard" className="no-deco">
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
            <Link to="/purchases" className="no-deco">
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
            <Link to="/bills" className="no-deco">
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