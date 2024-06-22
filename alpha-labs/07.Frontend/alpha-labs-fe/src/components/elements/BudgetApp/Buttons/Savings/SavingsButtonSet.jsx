import React from 'react';
import { Box, Stack, Paper, Typography } from '@mui/material';
import { AddFundBtn, AddPaycheckBtn, AddTransactionBtn } from '../../../../../components';
import PaymentsTwoToneIcon from '@mui/icons-material/PaymentsTwoTone';

const FundButtonSet = ({ paycheckCount, paycheckTemplateCount, totalMonthlyIncome, currentMonthlySavings, setSuccessState, setErrorState }) => {

    return (
        <Box display="flex" justifyContent="flex-end" alignItems="flex-end" gap={1}
            sx={{
                mt: 4,
                mb: -3.5,
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
                        minWidth: '200px'
                    }}
                >
                    <Stack>
                        <Typography
                            className="sec-header33"
                            sx={{ color: '#b3b3b3', mb: 0.5 }}
                        >
                            Paychecks Received
                        </Typography>
                        <Box display="flex" gap={1} sx={{ mt: 1 }}>
                            {Array.from({ length: paycheckCount }).map((_, index) => (
                                <PaymentsTwoToneIcon
                                    key={index}
                                    fontSize="large"
                                    sx={{
                                        color: '#00cc7a'
                                    }}
                                />
                            ))}
                            {Array.from({ length: paycheckTemplateCount - paycheckCount }).map((_) => (
                                <PaymentsTwoToneIcon
                                    fontSize="large"
                                    sx={{
                                        color: '#808080'
                                    }}
                                />
                            ))}
                        </Box>
                    </Stack>
                </Paper>
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
                            sx={{ color: '#b3b3b3', mb: "11px" }}
                        >
                            Monthly Income
                        </Typography>
                        <Typography
                            sx={{
                                color: '#00cc7a',
                                fontSize: '1.5rem',
                                fontWeight: '600'
                            }}
                        >
                            ${totalMonthlyIncome.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </Typography>
                    </Stack>
                </Paper>
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
                            sx={{ color: '#b3b3b3', mb: "11px" }}
                        >
                            Current Savings
                        </Typography>
                        <Typography
                            sx={{
                                color: '#00cc7a',
                                fontSize: '1.5rem',
                                fontWeight: '600'
                            }}
                        >
                            ${currentMonthlySavings.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
            <Stack>
                <AddFundBtn setSuccessState={setSuccessState} setErrorState={setErrorState} />
                <AddPaycheckBtn setSuccessState={setSuccessState} setErrorState={setErrorState} />
                <AddTransactionBtn setSuccessState={setSuccessState} setErrorState={setErrorState} />
            </Stack>
        </Box>
    );
}

export default FundButtonSet;