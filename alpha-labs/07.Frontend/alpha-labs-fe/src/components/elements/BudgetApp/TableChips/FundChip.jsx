import React from 'react';
import { Chip } from '@mui/material';

const FundChip = () => {
    return (
        <Chip
            label="Fund"
            size="small"
            sx={{
                my: 0.5,
                color: '#fff',
                backgroundColor: '#00cc7a'
            }}
        />
    );
}

export default FundChip;