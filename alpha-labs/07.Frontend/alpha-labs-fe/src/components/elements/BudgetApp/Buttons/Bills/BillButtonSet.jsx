import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { Box, Stack, Paper, Typography, Tooltip } from '@mui/material';
import { AddBillBtn } from '../../../../../components';

const BillButtonSet = ({ billingTotal, billsCount, billsPaidCount, setSuccessState, setErrorState }) => {
    return (
        <Box display="flex" alignItems="flex-end"
            sx={{
                mt: 8,
                mb: -4,
            }}
        >
            <Box
                display="flex"
                alignItems="center"
                flexGrow={1}
                gap={2}
            >
                <Paper elevation={4} sx={{ py: 1, px: 1.5, backgroundColor: '#3f3f46' }}>
                    <Stack>
                        <Tooltip title="The sum of all monthly bills including paid & un-paid bills.">
                            <Typography
                                className="sec-header33"
                                sx={{ color: '#b3b3b3', mb: 1 }}
                            >
                                Monthly Bill Total
                            </Typography>
                        </Tooltip>
                        <Box display="flex" alignItems="baseline" gap={0.5}>
                            <Typography
                                sx={{
                                    color: '#1976d2'
                                }}
                            >
                                <span className='num-text-bold'>${billingTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
                <Paper elevation={4} sx={{ py: 1, px: 1.5, backgroundColor: '#3f3f46' }}>
                    <Stack>
                        <Typography
                            className="sec-header33"
                            sx={{ color: '#b3b3b3', mb: 1 }}
                        >
                            Monthly Bills Paid
                        </Typography>
                        <Box display="flex" alignItems="baseline" gap={0.5}>
                            <Typography
                                sx={{
                                    color: '#1976d2'
                                }}
                            >
                                <span className='num-text-bold'>{billsPaidCount}</span>
                            </Typography>
                            <Typography
                                sx={{
                                    color: '#1976d2'
                                }}
                            >
                                <span className='sec-header4'>/ {billsCount} total bills</span>
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
            </Box>
            {/* <Box
                display="flex"
                alignItems="baseline"
                flexGrow={1}
                gap={1.5}
                ml={0.5}
            >
                <Typography
                    className="sec-header3"
                    sx={{ color: '#b3b3b3' }}
                >
                    Bills paid: 
                </Typography>
                <Box display="flex" alignItems="baseline">
                    <Typography
                        sx={{
                            color: '#1976d2'
                        }}
                    >
                        <span className='sec-header-bold ls-200'>{billsPaidCount}</span>
                    </Typography>
                    <Typography
                        sx={{
                            color: '#fff'
                        }}
                    >
                        <span className="sec-header4">/ {billsCount} total bills</span>
                    </Typography>
                </Box>
            </Box> */}
            <AddBillBtn setSuccessState={setSuccessState} setErrorState={setErrorState} />
        </Box>
    );
}

export default BillButtonSet;