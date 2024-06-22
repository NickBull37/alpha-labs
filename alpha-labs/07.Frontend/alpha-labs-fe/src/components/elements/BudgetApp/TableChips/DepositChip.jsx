import React from 'react';
import { Chip } from '@mui/material';

const DepositChip = () => {
    return (
        <Chip
            label="Deposit"
            size="small"
            sx={{
                my: 0.5,
                color: '#fff',
                backgroundColor: '#00cc7a'
            }}
        />
    );
}

export default DepositChip;