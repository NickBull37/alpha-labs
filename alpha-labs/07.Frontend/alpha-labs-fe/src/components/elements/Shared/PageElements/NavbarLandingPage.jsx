import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';
import { alphaLogo, vault, budgetBull, calendarBull, todoBull } from '../../../../utils/constants';

const HeaderBox = styled(Box)(() => ({
    height: '14vh',
    maxHeight: '70px',
    width: '100vw',
    display: "flex",
    alignItems: 'center',
    padding: '0 28px',
    backgroundColor: '#1a1a1a',
    boxShadow: '0px 0px 15px 2px #0d0d0d',
    zIndex: '100',
}));

const StyledPaper = styled(Paper)(() => ({
    backgroundColor: '#262626',
    display: "flex",
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    padding: 2
}));

const NavbarLandingPage = ({ appName }) => {
    return (
        <HeaderBox>
            <Box
                display="flex"
                alignItems="center"
                gap={2}
                sx={{
                    height: '100%'
                }}
            >
                <Link to="/">
                    <img className='test-img' src={vault} height={50}/>
                </Link>
                <Box
                    sx={{
                        height: '90%',
                        borderRight: '2px solid #333333'
                    }}
                >
                    &nbsp;
                </Box>
                {appName === 'BullsBudget' ? (
                    <Link to="/budget-landing">
                        <img className='test-img2' src={budgetBull} height={58}/>
                    </Link>
                ) : appName === 'BullsCalendar' ? (
                    <Link to="/calendar-landing">
                        <img className='test-img3' src={calendarBull} height={65}/>
                    </Link>
                ) : appName === 'BullsTodos' ? (
                    <Link to="/todo-landing">
                        <img className='test-img4' src={todoBull} height={55}/>
                    </Link>
                ) : (
                    <Link to="/calendar-landing">
                        <img className='test-img3' src={calendarBull} height={65}/>
                    </Link>
                )}
                
            </Box>
            <Box flexGrow={1}></Box>
        </HeaderBox>
    );
}

export default NavbarLandingPage;