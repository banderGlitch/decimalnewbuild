import React from 'react';
import './Table.css';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LoopIcon from '@mui/icons-material/Loop';


const statusStyles = {
    Delivered: {
        backgroundColor: 'green',
        icon: <CheckCircleIcon />,
    },
    Inflight: {
        backgroundColor: 'violet',
        icon: <LoopIcon />,
    },
};


const StatusCell = ({ status }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
 
    const { backgroundColor, icon } = statusStyles[status] || {};


    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center',
            position:"relative",
            top:"10px",
            backgroundColor,
            borderRadius: 3,
            padding: isSmallScreen ? '2px 4px' : '4px 8px',
            color: 'white',
            gap:"2.5px"
        }}>
            {React.cloneElement(icon, { fontSize: isSmallScreen ? 'small' : 'default' })}
            <Typography variant="body2"  sx={{fontFamily: 'Poppins', fontSize: "12px"}}>
               {status}
            </Typography>
        </Box>
    );
};

export default StatusCell;
