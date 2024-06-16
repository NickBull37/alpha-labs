import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { bullsBudget, bullsCalendar, bullsPhotos, bullsTodos } from '../../utils/constants';

function Header() {
    return (
        <Box
            display="flex"
            justifyContent="space-evenly"
            sx={{
                bgcolor: '#1a1a1a',
                py: 2,
                px: 2,
            }}
        >
            <Link to="/budget-landing">
                <div>
                    <img className="app-preview-bud" src={bullsBudget} height={80}/>
                </div>
            </Link>
            <Link to="/photo-landing">
                <div>
                    <img className="app-preview-pho" src={bullsPhotos} height={80}/>
                </div>
            </Link>
            <Link to="/todo-landing">
                <div>
                    <img className="app-preview-tod" src={bullsTodos} height={80}/>
                </div>
            </Link>
            <Link to="/calendar-landing">
                <div>
                    <img className="app-preview-cal" src={bullsCalendar} height={80}/>
                </div>
            </Link>
        </Box>
    );
}

export default Header;