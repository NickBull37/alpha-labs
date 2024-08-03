import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Stack, Typography, Paper, Grid, Button } from '@mui/material';
import { Navbar } from '../../../components';
import { weatherBull } from '../../../utils/constants';

const FontStack = styled(Stack)(() => ({
    display: 'flex',
    alignItems: 'center'
}));

const FontPaper = styled(Paper)(() => ({
    width: '40vw',
    height: '180px',
    backgroundColor: '#404040',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
}));

const FontShowcase = () => {

    const navLinks = [];

    return (
        <Stack>
            <Navbar
                appName="Development"
                navLinks={navLinks}
            />
            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                alignItems="baseline"
                gap={10}
                sx={{
                    py: 14,
                    px: 4
                }}
            >
                <FontStack gap={1.5}>
                    <Typography className='blackpearl-demo-h1'>
                        BLACKPEARL
                    </Typography>
                    <FontPaper>
                        <Typography className='blackpearl-demo-sec3'>
                            Section Heading
                        </Typography>
                        <Typography className='blackpearl-demo-p'>
                            This is example text using Blackpearl with font-size of 1 .125rem. This is more
                            example text. And more over here. Use the Blackpearl font in your next project.
                        </Typography>
                    </FontPaper>
                </FontStack>
                <FontStack gap={0}>
                    <Typography className='brosh-demo-h1'>
                        BROSH
                    </Typography>
                    <FontPaper>
                        <Typography className='brosh-demo-sec3'>
                            Section Heading
                        </Typography>
                        <Typography className='brosh-demo-p'>
                            This is example text using Brosh with font-size of 1.5rem. This is more
                            example text. And more over here. Use the Brosh font in your next project.
                        </Typography>
                    </FontPaper>
                </FontStack>
                <FontStack gap={0.5}>
                    <Typography className='cornerstone-demo-h1'>
                        CORNERSTONE
                    </Typography>
                    <FontPaper>
                        <Typography className='cornerstone-demo-sec3'>
                            Section Heading
                        </Typography>
                        <Typography className='cornerstone-demo-p'>
                            This is example text using Cornerstone with font-size of 1.125rem. This is more
                            example text. And more over here. Use the Cornerstone font in your next project.
                        </Typography>
                    </FontPaper>
                </FontStack>
                <FontStack gap={0.5}>
                    <Typography className='engine-demo-h1'>
                        ENGINE
                    </Typography>
                    <FontPaper>
                        <Typography className='engine-demo-sec3'>
                            Section Heading
                        </Typography>
                        <Typography className='engine-demo-p'>
                            This is example text using Engine with font-size of 1.5rem. This is more
                            example text. And more over here. Use the Engine font in your next project.
                        </Typography>
                    </FontPaper>
                </FontStack>
                <FontStack gap={1}>
                    <Typography className='eros-demo-h1'>
                        EROS
                    </Typography>
                    <FontPaper>
                        <Typography className='eros-demo-sec3'>
                            Section Heading
                        </Typography>
                        <Typography className='eros-demo-p'>
                            This is example text using Eros with font-size of 1.25rem. This is more
                            example text. And more over here. Use the Eros font in your next project.
                        </Typography>
                    </FontPaper>
                </FontStack>
                <FontStack>
                    <Typography className='fastrace-demo-h1'>
                        FASTRACE
                    </Typography>
                    <FontPaper>
                        <Typography className='fastrace-demo-sec3'>
                            Section Heading
                        </Typography>
                        <Typography className='fastrace-demo-p'>
                            This is example text using Fastrace with font-size of 1.25rem. This is more
                            example text. And more over here. Use the Fastrace font in your next project.
                        </Typography>
                    </FontPaper>
                </FontStack>
                <FontStack gap={0.5}>
                    <Typography className='geobin-demo-h1'>
                        GEOBIN
                    </Typography>
                    <FontPaper>
                        <Typography className='geobin-demo-sec3'>
                            Section Heading
                        </Typography>
                        <Typography className='geobin-demo-p'>
                            This is example text using Fastrace with font-size of 1.125rem. This is more
                            example text. And more over here. Use the Fastrace font in your next project.
                        </Typography>
                    </FontPaper>
                </FontStack>
                <FontStack>
                    <Typography className='hacked-demo-h1'>
                        HACKED
                    </Typography>
                    <FontPaper>
                        <Typography className='hacked-demo-sec3'>
                            Section Heading
                        </Typography>
                        <Typography className='hacked-demo-p'>
                            This is example text using Fastrace with font-size of 1.25rem. This is more
                            example text. And more over here. Use the Fastrace font in your next project.
                        </Typography>
                    </FontPaper>
                </FontStack>
                <FontStack>
                    <Typography className='kepo-demo-h1'>
                        KEPO
                    </Typography>
                    <FontPaper>
                        <Typography className='kepo-demo-sec3'>
                            Section Heading
                        </Typography>
                        <Typography className='kepo-demo-p'>
                            This is example text using Kepo with font-size of 1.125rem. This is more
                            example text. And more over here. Use the Kepo font in your next project.
                        </Typography>
                    </FontPaper>
                </FontStack>
                <FontStack gap={1}>
                    <Typography className='progress-demo-h1'>
                        PROGRESS
                    </Typography>
                    <FontPaper>
                        <Typography className='progress-demo-sec3'>
                            Section Heading
                        </Typography>
                        <Typography className='progress-demo-p'>
                            This is example text using Progress with font-size of 1.125rem. This is more
                            example text. And more over here. Use the Progress font in your next project.
                        </Typography>
                    </FontPaper>
                </FontStack>
                <FontStack gap={1}>
                    <Typography className='revered-demo-h1'>
                        REVERED
                    </Typography>
                    <FontPaper>
                        <Typography className='revered-demo-sec3'>
                            Section Heading
                        </Typography>
                        <Typography className='revered-demo-p'>
                            This is example text using Fastrace with font-size of 0.75rem. This is more
                            example text. And more over here. Use the Fastrace font in your next project.
                        </Typography>
                    </FontPaper>
                </FontStack>
                <FontStack gap={1.75}>
                    <Typography className='salvar-demo-h1'>
                        SALVAR
                    </Typography>
                    <FontPaper>
                        <Typography className='salvar-demo-sec3'>
                            SECTION HEADING
                        </Typography>
                        <Typography className='salvar-demo-p'>
                            THIS IS EXAMPLE TEXT USING SALVAR WITH FONT-SIZE 1REM. THIS IS MORE
                            EXAMPLE TEXT. AND MORE OVER HERE. USE THE SALVAR FONT IN YOUR NEXT PROJECT.
                        </Typography>
                    </FontPaper>
                </FontStack>
                <FontStack gap={1.25}>
                    <Typography className='signwood-demo-h1'>
                        Signwood
                    </Typography>
                    <FontPaper>
                        <Typography className='signwood-demo-sec3'>
                            Section Heading
                        </Typography>
                        <Typography className='signwood-demo-p'>
                            This is example text using Wolfalcon with font-size of 0.875rem. This is more
                            example text. And more over here. Use the Wolfalcon font in your next project.
                        </Typography>
                    </FontPaper>
                </FontStack>
                <FontStack>
                    <Typography className='signature-demo-h1'>
                        Signature
                    </Typography>
                    <FontPaper>
                        <Typography className='signature-demo-sec3'>
                            Section Heading
                        </Typography>
                        <Typography className='signature-demo-p'>
                            Don't use this font for paragraph text.
                        </Typography>
                    </FontPaper>
                </FontStack>
                <FontStack gap={1}>
                    <Typography className='wolfalcon-demo-h1'>
                        WOLFALCON
                    </Typography>
                    <FontPaper>
                        <Typography className='wolfalcon-demo-sec3'>
                            Section Heading
                        </Typography>
                        <Typography className='wolfalcon-demo-p'>
                            This is example text using Wolfalcon with font-size of 0.875rem. This is more
                            example text. And more over here. Use the Wolfalcon font in your next project.
                        </Typography>
                    </FontPaper>
                </FontStack>
                <FontStack gap={1}>
                    <Typography className='wordmean-demo-h1'>
                        WORDMEAN
                    </Typography>
                    <FontPaper>
                        <Typography className='wordmean-demo-sec3'>
                            Section Heading
                        </Typography>
                        <Typography className='wordmean-demo-p'>
                            This is example text using Wordmean with font-size of 1.125rem. This is more
                            example text. And more over here. Use the Wordmean font in your next project.
                        </Typography>
                    </FontPaper>
                </FontStack>
            </Box>
        </Stack>
    );
}

export default FontShowcase;