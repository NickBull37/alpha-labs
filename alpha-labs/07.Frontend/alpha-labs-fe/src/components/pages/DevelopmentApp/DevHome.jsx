import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Stack, Paper, Typography, } from '@mui/material';
import { Navbar } from '../../../components';
import { bullsBudget, bullsCalendar, fontsShowcase } from '../../../utils/constants';
import TerminalIcon from '@mui/icons-material/Terminal';
import CodeIcon from '@mui/icons-material/Code';

const SectionPaper = styled(Paper)(() => ({
    borderRadius: "4px",
    backgroundColor: '#4d4d4d',
    boxShadow: "0px 2px 10px 1px #1a1a1a",
    padding: "16px 16px",
    color: "#fff"
}));

const LinkBox = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    gap: 12
}));

const DevHome = () => {

    const navLinks = [
        {
            index: 1,
            label: 'HOME',
            link: '/dev-home'
        },
        {
            index: 2,
            label: 'FONTS',
            link: '/dev-fonts'
        },
        {
            index: 3,
            label: 'SQL QUERIES',
            link: '/dev-sql'
        },
        {
            index: 4,
            label: 'C# / .NET',
            link: '/dev-csharp'
        },
        {
            index: 5,
            label: 'ReactJS',
            link: '/dev-react'
        },
    ];

    return (
        <Stack>
            <Navbar
                appName={"BullsDev"}
                currentPage={"HOME"}
                navLinks={navLinks}
                linkClassName={"hacked-p-green-grad"}
            />
            <Stack
                display="flex"
                gap={8}
                sx={{
                    my: 16,
                    mx: "25%"
                }}
            >
                {/* Fonts Stack */}
                <Stack
                    gap={2}
                >
                    <Typography className='dev-h1'>Fonts</Typography>
                    <SectionPaper>
                        <LinkBox>
                            <TerminalIcon fontSize='small' sx={{ color: '#00e6cf' }} />
                            <Link to="/dev-fonts">
                                <Typography className='dev-p'>Showcase for all downloaded fonts in various sizes</Typography>
                            </Link>
                        </LinkBox>
                    </SectionPaper>
                </Stack>
                {/* C# / .NET Stack */}
                <Stack
                    gap={2}
                >
                    <Typography className='dev-h1'>C# / .NET</Typography>
                    <SectionPaper>
                        <Typography className='dev-h3'>Class Cheat-Sheets</Typography>
                        <Box
                            display="flex"
                            width="100%"
                            gap={4}
                            sx={{
                                mt: 1,
                                width: "100%"
                            }}
                        >
                            <Stack
                                width="50%"
                                sx={{
                                    px: 1.5,
                                    py: 1.5,
                                    backgroundColor: "rgba(27, 255, 233, 0.1)",
                                    borderRadius: "4px"
                                }}
                            >
                                <Typography className='sec-header5'>Data Structures</Typography>
                                <LinkBox
                                    mt={0.5}
                                >
                                    <CodeIcon fontSize='small' sx={{ color: '#00e6cf' }} />
                                    <Link to="/array-cheatsheet">
                                        <Typography className='dev-p'>Array</Typography>
                                    </Link>
                                </LinkBox>
                                <LinkBox
                                    mt={0.5}
                                >
                                    <CodeIcon fontSize='small' sx={{ color: '#00e6cf' }} />
                                    <Link to="/list-cheatsheet">
                                        <Typography className='dev-p'>List</Typography>
                                    </Link>
                                </LinkBox>
                                <LinkBox
                                    mt={0.5}
                                >
                                    <CodeIcon fontSize='small' sx={{ color: '#00e6cf' }} />
                                    <Link to="#">
                                        <Typography className='dev-p'>Dictionary</Typography>
                                    </Link>
                                </LinkBox>
                            </Stack>
                            <Stack
                                width="50%"
                                sx={{
                                    px: 1.5,
                                    py: 1.5,
                                    backgroundColor: "rgba(27, 255, 233, 0.1)",
                                    borderRadius: "4px"
                                }}
                            >
                                <Typography className='sec-header5'>Structs</Typography>
                                <LinkBox
                                    mt={0.5}
                                >
                                    <CodeIcon fontSize='small' sx={{ color: '#00e6cf' }} />
                                    <Link to="/string-cheatsheet">
                                        <Typography className='dev-p'>String</Typography>
                                    </Link>
                                </LinkBox>
                                <LinkBox
                                    mt={0.5}
                                >
                                    <CodeIcon fontSize='small' sx={{ color: '#00e6cf' }} />
                                    <Link to="/datetime-cheatsheet">
                                        <Typography className='dev-p'>DateTime</Typography>
                                    </Link>
                                </LinkBox>
                            </Stack>
                        </Box>
                    </SectionPaper>
                    <SectionPaper>
                        <Typography className='dev-h3'>Library Cheat-Sheets</Typography>
                        <LinkBox
                            mt={2}
                        >
                            <CodeIcon fontSize='medium' sx={{ color: '#00e6cf' }} />
                            <Link to="#">
                                <Typography className='dev-p'>LINQ</Typography>
                            </Link>
                        </LinkBox>
                        <LinkBox
                            mt={2}
                        >
                            <CodeIcon fontSize='medium' sx={{ color: '#00e6cf' }} />
                            <Link to="#">
                                <Typography className='dev-p'>Newtonsoft</Typography>
                            </Link>
                        </LinkBox>
                    </SectionPaper>
                    <SectionPaper>
                        <Typography className='dev-h3'>Code Examples</Typography>
                        <LinkBox
                            mt={2}
                        >
                            <CodeIcon fontSize='medium' sx={{ color: '#00e6cf' }} />
                            <Link to="/controller-example">
                                <Typography className='dev-p'>ASP.NET Controller example</Typography>
                            </Link>
                        </LinkBox>
                        <LinkBox
                            mt={1}
                        >
                            <CodeIcon fontSize='medium' sx={{ color: '#00e6cf' }} />
                            <Link to="/repo-example">
                                <Typography className='dev-p'>ASP.NET Repository example</Typography>
                            </Link>
                        </LinkBox>
                    </SectionPaper>
                </Stack>
            </Stack>
            {/* <Stack
                display="flex"
                width='100%'
                alignItems="center"
                gap={8}
                sx={{
                    my: 16
                }}
            >
                <Box
                    display="flex"
                    gap={8}
                >
                    <Link to="/dev-fonts">
                        <img className="app-preview-bud" src={fontsShowcase} height={250}/>
                    </Link>
                    <Link to="/dev-fonts">
                        <img className="app-preview-cal" src={bullsCalendar} height={250}/>
                    </Link>
                </Box>
                <Box
                    display="flex"
                    gap={8}
                >
                    <Link to="/dev-fonts">
                        <img className="app-preview-bud" src={bullsBudget} height={250}/>
                    </Link>
                    <Link to="/dev-fonts">
                        <img className="app-preview-cal" src={bullsCalendar} height={250}/>
                    </Link>
                </Box>
            </Stack> */}
        </Stack>
    );
}

export default DevHome;