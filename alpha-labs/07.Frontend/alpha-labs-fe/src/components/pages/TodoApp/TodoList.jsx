import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Stack, Typography, Paper, Grid, Button } from '@mui/material';
import { Navbar } from '../../../components';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const PageContainer = styled(Stack)(() => ({
    width: '100vw',
    display: 'flex',
}));

const ContentContainer = styled(Stack)(() => ({
    width: '100vw',
    padding: '6rem 24rem',
    display: 'flex',
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const TodoList = () => {

    // Constants
    const green = 'rgba(0, 255, 0, 0.7)';
    const navLinks = [];
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <PageContainer>
            <Navbar
                appName={"BullsTodos"}
                navLinks={navLinks}
            />
            <ContentContainer>
                <Box
                    sx={{
                        bgcolor: '#3e3e3e',
                    }}
                >
                    <AppBar position="static">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="fullWidth"
                        >
                            <Tab label="To-Do" {...a11yProps(0)} />
                            <Tab label="Completed" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        Test
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Test
                    </TabPanel>
                </Box>
            </ContentContainer>
        </PageContainer>
    );
}

export default TodoList;