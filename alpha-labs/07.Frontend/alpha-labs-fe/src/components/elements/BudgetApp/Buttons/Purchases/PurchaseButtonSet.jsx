import React from 'react';
import { Box, Stack, Paper, Typography } from '@mui/material';
import { AddPurchaseBtn } from '../../../../../components';

const PurchaseButtonSet = ({ purchaseTotal, luxuryPurchaseTotal, luxuryPurchaseLimit, necessityPurchaseTotal, setSuccessState, setErrorState }) => {

    return (
        <Box display="flex" alignItems="flex-end"
            sx={{
                mt: 6,
            }}
        >
            <Box
                display="flex"
                alignItems="center"
                flexGrow={1}
                gap={2}
            >
                <Paper
                    elevation={4}
                    sx={{
                        py: 1,
                        px: 1.5,
                        backgroundColor: '#3f3f46',
                        minWidth: '150px'
                    }}
                >
                    <Stack>
                        <Typography
                            className="sec-header33"
                            sx={{ color: '#b3b3b3', mb: 0.5 }}
                        >
                            Luxury Spending
                        </Typography>
                        <Box display="flex" alignItems="baseline" gap={0.5}>
                            <Typography
                                sx={{
                                    color: '#ff1a75'
                                }}
                            >
                                <span className='num-text-bold'>${luxuryPurchaseTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </Typography>
                            <Typography
                                sx={{
                                    color: '#ff1a75'
                                }}
                            >
                                <span className='sec-header4'>/ ${luxuryPurchaseLimit}</span>
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
                <Typography className="text-icon-plus">+</Typography>
                <Paper
                    elevation={4}
                    sx={{
                        py: 1,
                        px: 1.5,
                        backgroundColor: '#3f3f46',
                        minWidth: '150px'
                    }}
                >
                    <Stack>
                        <Typography
                            className="sec-header33"
                            sx={{ color: '#b3b3b3', mb: 0.5 }}
                        >
                            Necessities
                        </Typography>
                        <Typography
                            sx={{
                                color: '#ff1a75'
                            }}
                        >
                            <span className='num-text-bold'>
                                ${necessityPurchaseTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </span>
                        </Typography>
                    </Stack>
                </Paper>
                <Typography className="text-icon-equal">=</Typography>
                <Paper
                    elevation={4}
                    sx={{
                        py: 1,
                        px: 1.5,
                        backgroundColor: '#3f3f46',
                        minWidth: '150px'
                    }}
                >
                    <Stack>
                        <Typography
                            className="sec-header33"
                            sx={{ color: '#b3b3b3', mb: 0.5 }}
                        >
                            Total Spent
                        </Typography>
                        <Typography
                            sx={{
                                color: '#ff1a75'
                            }}
                        >
                            <span className='num-text-bold'>${purchaseTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
            <AddPurchaseBtn setSuccessState={setSuccessState} setErrorState={setErrorState} />
        </Box>
    );
}

export default PurchaseButtonSet;