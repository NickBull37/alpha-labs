import React from 'react';
import { Stack } from '@mui/material';
import { AddBirthdayBtn, AddEventBtn, AddHolidayBtn } from '../../../../components';

const CalButtonSet = ({ setSuccessState, setErrorState }) => {
    return (
        <Stack
            gap={2}
            sx={{
                position: 'fixed',
                bottom: 28,
                right: 28,
                transform: 'translateZ(0px)',
                flexGrow: 1
            }}
        >
            <AddBirthdayBtn
                setSuccessState={setSuccessState}
                setErrorState={setErrorState}
            />
            <AddEventBtn
                setSuccessState={setSuccessState}
                setErrorState={setErrorState}
            />
            <AddHolidayBtn
                setSuccessState={setSuccessState}
                setErrorState={setErrorState}
            />
        </Stack>
    );
}

export default CalButtonSet;