import React from 'react';
import { Chip } from '@mui/material';

const PaycheckChip = () => {
    return (
        <Chip
            label="Paycheck"
            size="small"
            sx={{
                my: 0.5,
                color: '#fff',
                backgroundColor: '#009933'
            }}
        />
    );
}

export default PaycheckChip;