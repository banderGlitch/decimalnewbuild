import React from 'react';
import { Box, Typography } from '@mui/material';

const protocolIcons = {
    "Merkly": "https://icons-ckg.pages.dev/lz-scan/protocols/merkly.svg",
    "Testnet Bridge": "https://icons-ckg.pages.dev/lz-scan/protocols/testnet-bridge.svg",
    "Superform": "https://icons-ckg.pages.dev/lz-scan/protocols/superform.svg",
    "Stargate": "https://icons-ckg.pages.dev/lz-scan/protocols/superform.svg", 
    "Osaka Protocol": "https://icons-ckg.pages.dev/lz-scan/protocols/superform.svg", 
    "Fuse Bridge": "https://icons-ckg.pages.dev/lz-scan/protocols/superform.svg"
};

const ProtocolCell = ({ protocol }) => {
    const iconUrl = protocolIcons[protocol];

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', alignSelf:"center", position:"relative", top:"15px"}}>
            {iconUrl && <img src={iconUrl} alt={protocol} style={{ width: 20, height: 20, marginRight: 8 }} />}
            <Typography variant="body2" sx={{ fontFamily: 'Poppins' }}>{protocol}</Typography>
        </Box>
    );
};

export default ProtocolCell;