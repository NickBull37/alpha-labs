import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Stack, Typography, Paper, Grid, Button } from '@mui/material';
import { PhotoAppHeader } from '../../../components';
import { photoBull } from '../../../utils/constants';

const LandingBox = styled(Box)(() => ({
    height: '85vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D121C',
}));

const LandingStack = styled(Stack)(() => ({
    height: '85vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D121C',
}));

const EnterButton = styled(Button)(() => ({
    color: '#fff',
    height: '60px',
    width: '200px',
    fontSize: '1.25rem',
    background: 'linear-gradient(to right, #8a0f21, #F71218)',
    boxShadow: '0px 2px 10px 1px #1a1a1a',
    backgroundColor: '#7e22ce',
    '&:hover': {
        boxShadow: '0px 0px 15px 1px #08579C',
    },
}));

const PhotoLanding = () => {
    return (
        <>
            <PhotoAppHeader />
            <LandingStack gap={8}>
                <Box display="flex" alignItems="center">
                    <Typography className="signature-h1-dark" sx={{ mb: -8 }}>Bull's</Typography>
                    <img src={photoBull} alt='logo' height={270} />
                    <Typography className="signature-h1-light" sx={{ mb: -8, ml: 1.5 }}>Photos</Typography>
                </Box>

                <Box
                    display={'flex'}
                    justifyContent={'center'}
                >
                    <Typography variant='h4'>
                        A simple photo app for organizing & storing photos
                    </Typography>
                </Box>

                <Box display={'flex'} justifyContent={'center'}>
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

export default PhotoLanding;