import React, { useState, useEffect } from 'react';
import axios from "axios";
import { styled } from '@mui/material/styles';
import { Box, Stack, Paper, Typography } from '@mui/material';

const StyledPaper = styled(Paper)(() => ({
    backgroundColor: '#3f3f46',
    color: '#fff',
    minWidth: '190px'
}));

const PurchaseDetails = () => {

    // State variables
    const [amazonSpending, setAmazonSpending] = useState(0);
    const [amazonPercentage, setAmazonPercentage] = useState(0);
    const [entertainmentSpending, setEntertainmentSpending] = useState(0);
    const [entertainmentPercentage, setEntertainmentPercentage] = useState(0);
    const [foodSpending, setFoodSpending] = useState(0);
    const [foodPercentage, setFoodPercentage] = useState(0);
    const [housingSpending, setHousingSpending] = useState(0);
    const [housingPercentage, setHousingPercentage] = useState(0);
    const [miscSpending, setMiscSpending] = useState(0);
    const [miscPercentage, setMiscPercentage] = useState(0);
    const [wawaSpending, setWawaSpending] = useState(0);
    const [wawaPercentage, setWawaPercentage] = useState(0);

    // Use Effects
    useEffect(() => {
        GetPurchaseNodes();
    }, []);

    // API Calls
    async function GetPurchaseNodes() {
        try {
            // Get purchase nodes data
            const response = await axios.get("https://localhost:44379/Purchase/nodes");

            if (response.status === 200) {
                setAmazonSpending(response.data.amazonValues.totalSpent);
                setAmazonPercentage(response.data.amazonValues.percentage);
                setEntertainmentSpending(response.data.entertainmentValues.totalSpent);
                setEntertainmentPercentage(response.data.entertainmentValues.percentage);
                setFoodSpending(response.data.foodValues.totalSpent);
                setFoodPercentage(response.data.foodValues.percentage);
                setHousingSpending(response.data.housingValues.totalSpent);
                setHousingPercentage(response.data.housingValues.percentage);
                setMiscSpending(response.data.miscValues.totalSpent);
                setMiscPercentage(response.data.miscValues.percentage);
                setWawaSpending(response.data.wawaValues.totalSpent);
                setWawaPercentage(response.data.wawaValues.percentage);
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <Box
            display="flex"
            gap={2.25}
            sx={{
                p: 2,
                border: '2px solid #ff1a75',
                borderRadius: '5px',
                backgroundColor: 'rgba(255, 26, 117, 0.03)'
            }}
        >
            <StyledPaper elevation={8}
                sx={{
                    py: 1,
                    px: 2,
                }}
            >
                <Stack>
                    <Typography className="sec-header3">
                        Amazon
                    </Typography>
                    <Typography className="subtitle2">
                        <span className="color-gray200">
                            Total Spent
                        </span>&nbsp;&nbsp;
                        <span className="body1">
                            ${amazonSpending.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </span>
                    </Typography>
                    <Typography className="pg-header3"
                        sx={{
                            pt: 1,
                            color: '#ff1a75'
                        }}
                    >
                        {amazonPercentage}%
                    </Typography>
                </Stack>
            </StyledPaper>
            <StyledPaper elevation={8}
                sx={{
                    py: 1,
                    px: 2,
                }}
            >
                <Stack>
                    <Typography className="sec-header3">
                        Entertainment
                    </Typography>
                    <Typography className="subtitle2">
                        <span className="color-gray200">
                            Total Spent
                        </span>&nbsp;&nbsp;
                        <span className="body1">
                            ${entertainmentSpending.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </span>
                    </Typography>
                    <Typography className="pg-header3"
                        sx={{
                            pt: 1,
                            color: '#ff1a75'
                        }}
                    >
                        {entertainmentPercentage}%
                    </Typography>
                </Stack>
            </StyledPaper>
            <StyledPaper elevation={8}
                sx={{
                    py: 1,
                    px: 2,
                }}
            >
                <Stack>
                    <Typography className="sec-header3">
                        Food
                    </Typography>
                    <Typography className="subtitle2">
                        <span className="color-gray200">
                            Total Spent
                        </span>&nbsp;&nbsp;
                        <span className="body1">
                            ${foodSpending.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </span>
                    </Typography>
                    <Typography className="pg-header3"
                        sx={{
                            pt: 1,
                            color: '#ff1a75'
                        }}
                    >
                        {foodPercentage}%
                    </Typography>
                </Stack>
            </StyledPaper>
            {/* <StyledPaper elevation={8}
                sx={{
                    py: 1,
                    px: 2,
                }}
            >
                <Stack>
                    <Typography className="sec-header3">
                        Housing
                    </Typography>
                    <Typography className="subtitle2">
                        <span className="color-gray200">
                            Total Spent
                        </span>&nbsp;&nbsp;
                        <span className="body1">
                            ${housingSpending.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </span>
                    </Typography>
                    <Typography className="pg-header3"
                        sx={{
                            pt: 1,
                            color: '#ff1a75'
                        }}
                    >
                        {housingPercentage}%
                    </Typography>
                </Stack>
            </StyledPaper> */}
            <StyledPaper elevation={8}
                sx={{
                    py: 1,
                    px: 2,
                }}
            >
                <Stack>
                    <Typography className="sec-header3">
                        Misc
                    </Typography>
                    <Typography className="subtitle2">
                        <span className="color-gray200">
                            Total Spent
                        </span>&nbsp;&nbsp;
                        <span className="body1">
                            ${miscSpending.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </span>
                    </Typography>
                    <Typography className="pg-header3"
                        sx={{
                            pt: 1,
                            color: '#ff1a75'
                        }}
                    >
                        {miscPercentage}%
                    </Typography>
                </Stack>
            </StyledPaper>
            <StyledPaper elevation={8}
                sx={{
                    py: 1,
                    px: 2,
                }}
            >
                <Stack>
                    <Typography className="sec-header3">
                        Wawa
                    </Typography>
                    <Typography className="subtitle2">
                        <span className="color-gray200">
                            Total Spent
                        </span>&nbsp;&nbsp;
                        <span className="body1">
                            ${wawaSpending.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </span>
                    </Typography>
                    <Typography className="pg-header3"
                        sx={{
                            pt: 1,
                            color: '#ff1a75'
                        }}
                    >
                        {wawaPercentage}%
                    </Typography>
                </Stack>
            </StyledPaper>
        </Box>
    );
}

export default PurchaseDetails;