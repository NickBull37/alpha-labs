import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Paper, Box, Stack, Button } from '@mui/material';
import { alphaLogo, budgetBull, dashboardShowcase, purchaseShowcase, billShowcase, savingsShowcase } from '../../../utils/constants';
import { LandingHeader } from '../..';

const GradientButton = styled(Button)(() => ({
    minHeight: '45px',
    minWidth: '120px',
    color: '#fff',
    background: 'linear-gradient(to right, #A602B0, #EE0425)',
    boxShadow: '0px 2px 10px 1px #1a1a1a',
    backgroundColor: '#7e22ce',
    '&:hover': {
        boxShadow: '0px 2px 20px 8px #1a1a1a',
    },
}));

const BudgetLanding = () => {
    return (
        <Stack>
            <LandingHeader />
            <Stack
                pt={6}
                pb={10}
                gap={8}
                sx={{
                    bgcolor: '#262626'
                }}
            >
                <Stack gap={3}>
                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems="center"
                        gap={6}
                    >
                        <img src={budgetBull} alt='logo' height={240} />
                        <Paper
                            className="grad-border"
                            elevation={0}
                            display="flex"
                            sx={{
                                py: 2,
                                px: 4,
                                bgcolor: '#1a1a1a',
                                borderRadius: '10px',
                                boxShadow: '0px 2px 15px 8px #1a1a1a'
                            }}
                        >
                            <Typography className="salvar-h1-red-grad">
                                BULL'S
                            </Typography>
                            <Typography className="salvar-h1-purp-grad">
                                BUDGET
                            </Typography>
                        </Paper>
                    </Box>
                </Stack>

                {/* Box for title */}
                <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Typography align={'center'} variant='h4'>
                        A simple budget app for tracking monthly expenses & spending habits
                    </Typography>
                </Box>

                {/* Box for buttons */}
                <Box display={'flex'} justifyContent={'center'} gap={12}>
                    <GradientButton
                        variant="contained"
                        size='large'
                        href="/budget-dashboard"
                    >
                        Enter
                    </GradientButton>
                </Box>
            </Stack>

            <Box
                py={8}
                px={16}
                sx={{
                    backgroundColor: '#333333'
                }}
            >
                <Box
                    display={'flex'}
                    flexDirection={{ xs: 'column', md: 'row'}}
                    alignItems={'center'}
                    gap={12}
                >
                    <Stack>
                        <Typography
                            className="progress-h4-pink-grad"
                            flexGrow={1}
                        >
                            Track Purchases
                        </Typography>
                        <Typography
                            variant='h6'
                            sx={{
                                color: '#d9d9d9'
                            }}
                        >
                            Log your purchases throughout the month to see what you spend most of your money on. Showcase Necessity vs Luxury spending to help identify where the most savings can be found.
                        </Typography>
                    </Stack>
                    <Paper
                        elevation={0}
                        sx={{
                            bgcolor: '#000',
                            borderTop: '3px solid #000',
                            borderRight: '3px solid #000',
                            borderLeft: '3px solid #000',
                            boxShadow: '0px 2px 25px 5px #1a1a1a'
                        }}
                    >
                        <img src={purchaseShowcase} alt='logo' height={250}/>
                    </Paper>
                </Box>
            </Box>

            <Box
                py={8}
                px={16}
            >
                <Box
                    display={'flex'}
                    flexDirection={{ xs: 'column', md: 'row'}}
                    alignItems={'center'}
                    gap={12}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            bgcolor: '#000',
                            borderTop: '3px solid #000',
                            borderRight: '3px solid #000',
                            borderLeft: '3px solid #000',
                            boxShadow: '0px 2px 25px 5px #1a1a1a'
                        }}
                    >
                        <img src={billShowcase} alt='logo' height={250}/>
                    </Paper>
                    <Stack>
                        <Typography
                            className="progress-h4-blue-grad"
                            flexGrow={1}
                        >
                            Manage Bills
                        </Typography>
                        <Typography
                            variant='h6'
                            sx={{
                                color: '#d9d9d9'
                            }}
                        >
                            Record all your recurring payments & monthly bills and never lose track of a subscription! Once bills are logged once, they can be recreated each month with a single click.
                        </Typography>
                    </Stack>
                </Box>
            </Box>

            <Box
                py={8}
                px={16}
                sx={{backgroundColor: '#333333'}}
            >
                <Box
                    display={'flex'}
                    flexDirection={{ xs: 'column', md: 'row'}}
                    alignItems={'center'}
                    gap={12}
                >
                    <Stack>
                        <Typography
                            className="progress-h4-green-grad"
                            flexGrow={1}
                        >
                            Start Saving
                        </Typography>
                        <Typography
                            variant='h6'
                            sx={{
                                color: '#d9d9d9'
                            }}
                        >
                            A monthly savings value is calculated by taking your total monthly income - total monthly purchases - total monthly bills. Track how these savings get divided by depositing them into funds!
                        </Typography>
                    </Stack>
                    <Paper
                        elevation={0}
                        sx={{
                            bgcolor: '#000',
                            borderTop: '3px solid #000',
                            borderRight: '3px solid #000',
                            borderLeft: '3px solid #000',
                            boxShadow: '0px 2px 25px 5px #1a1a1a'
                        }}
                    >
                        <img src={savingsShowcase} alt='logo' height={250}/>
                    </Paper>
                </Box>
            </Box>

            <Box
                py={8}
                px={16}
            >
                <Box
                    display={'flex'}
                    flexDirection={{ xs: 'column', md: 'row'}}
                    alignItems={'center'}
                    gap={12}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            bgcolor: '#000',
                            borderTop: '3px solid #000',
                            borderRight: '3px solid #000',
                            borderLeft: '3px solid #000',
                            boxShadow: '0px 2px 25px 5px #1a1a1a'
                        }}
                    >
                        <img src={dashboardShowcase} alt='logo' height={250}/>
                    </Paper>
                    <Stack>
                        <Typography
                            className="progress-h4-purple-grad"
                            flexGrow={1}
                        >
                            Dashboard
                        </Typography>
                        <Typography
                            variant='h6'
                            sx={{
                                color: '#d9d9d9'
                            }}
                        >
                            View all of your finances in one place. The dashboard page shows the highlights of each category and provides a convenient place for quick check-ins.
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </Stack>
    )
}

export default BudgetLanding;