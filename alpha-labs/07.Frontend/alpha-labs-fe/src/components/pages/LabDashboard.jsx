import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Stack, Typography, Paper, Grid, Button } from '@mui/material';
import { Header } from '../../components'
import { bullsBudget, bullsCalendar, bullsPhotos, bullsTodos } from '../../utils/constants';

const AppBox = styled(Box)(() => ({
    width: "42vw",
    height: "40vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    boxShadow: "0px 2px 10px 4px #1a1a1a"
}));

const LabDashboard = () => {
    return (
        // <Header />
        <Stack
            height='100vh'
            width='100vw'
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
        >
            <Box
                display="flex"
                gap={6}
            >
                <AppBox
                    sx={{
                        bgcolor: 'rgba(255, 0, 255, 0.2)',
                    }}
                >
                    <Link to="/budget-landing">
                        <img className="app-preview-bud" src={bullsBudget} height={150}/>
                    </Link>
                </AppBox>
                <AppBox
                    sx={{
                        bgcolor: 'rgba(238, 4, 41, 0.3)',
                    }}
                >
                    <Link to="/photo-landing">
                        <img className="app-preview-pho" src={bullsPhotos} height={150}/>
                    </Link>
                </AppBox>
            </Box>
            <Box
                display="flex"
                gap={6}
            >
                <AppBox
                    sx={{
                        bgcolor: 'rgba(160, 238, 25, 0.3)',
                    }}
                >
                    <Link to="/todo-landing">
                        <img className="app-preview-tod" src={bullsTodos} height={150}/>
                    </Link>
                </AppBox>
                <AppBox
                    sx={{
                        bgcolor: 'rgba(0, 82, 204, 0.3)',
                    }}
                >
                    <Link to="/calendar-landing">
                        <img className="app-preview-cal" src={bullsCalendar} height={150}/>
                    </Link>
                </AppBox>
            </Box>
        </Stack>
    );
}

export default LabDashboard;