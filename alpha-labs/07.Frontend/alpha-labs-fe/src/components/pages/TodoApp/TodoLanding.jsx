import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack, Typography, Paper, Grid, Button } from '@mui/material';
import { NavbarLandingPage } from '../../../components';

const LandingPageStack = styled(Stack)(() => ({
    width: '100vw',
    display: 'flex',
}));

const LandingContentStack = styled(Stack)(() => ({
    minHeight: '86vh',
    height: '100%',
    width: '100vw',
    paddingLeft: '6rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
}));

const TodoLanding = () => {

    const green = 'rgba(0, 255, 0, 0.7)';

    return (
        <LandingPageStack>
            <NavbarLandingPage
                appName={"BullsTodos"}
            />
            <LandingContentStack
                className="bg-image"
                gap={2}
            >
                <Box
                    sx={{

                    }}
                >
                    <Typography className="fastrace-h1">
                        TO -DO&nbsp;
                    </Typography>
                </Box>
                {/* <Box
                    display={'flex'}
                    justifyContent={'center'}
                >
                    <Typography variant='h4'>
                        A simple to-do list app for keeping track of day to day tasks
                    </Typography>
                </Box> */}
                <Box
                    sx={{
                        ml: 23
                    }}
                >
                    <Button
                        className='todo-landing-btn'
                        variant="contained"
                        size='large'
                        href="/todo-list"
                    >
                        Enter
                    </Button>
                </Box>
            </LandingContentStack>
        </LandingPageStack>
    );
}

export default TodoLanding;