import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Stack, Typography, Paper, Grid, Button } from '@mui/material';
import { TodoAppHeader } from '../../../components';
import { todoBull, testBull } from '../../../utils/constants';

const LandingStack = styled(Stack)(() => ({
    height: '85vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    backgroundImage: '',
    //backgroundColor: '#333333',
}));

const EnterButton = styled(Button)(() => ({
    color: '#fff',
    height: '50px',
    width: '160px',
    fontSize: '1.25rem',
    background: 'linear-gradient(to right, #00cc00, #00ff00)',
    boxShadow: '0px 2px 10px 1px #1a1a1a',
    backgroundColor: '#7e22ce',
    '&:hover': {
        background: 'linear-gradient(to right, #00b300, #00e600)',
        boxShadow: '0px 0px 15px 2px #1a1a1a',
    },
}));

const TodoLanding = () => {
    return (
        <>
            <TodoAppHeader />
            <LandingStack className="bg-image">
                <Box display="flex" alignItems="center" sx={{ mt: 2, mb: 12 }}>
                    <Typography className="fastrace-h1">
                        TO -DO&nbsp;
                    </Typography>
                </Box>

                <Box
                    display={'flex'}
                    justifyContent={'center'}
                >
                    <Typography variant='h4'>
                        A simple to-do list app for keeping track of day to day tasks
                    </Typography>
                </Box>

                <Box display={'flex'} justifyContent={'center'} sx={{ mt: 6 }}>
                    <EnterButton
                        variant="contained"
                        size='large'
                        href="/photo-album"
                    >
                        Enter
                    </EnterButton>
                </Box>
            </LandingStack>
        </>
    );
}

export default TodoLanding;