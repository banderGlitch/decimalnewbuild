import React, { useState }  from 'react';
import { Box, Card, Typography, Button, useMediaQuery, TextField, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import './Swap.css';

const SwapCard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [firstToken, setFirstToken] = useState('WETH');
  const [secondToken, setSecondToken] = useState('DAI');
  const [firstTokenAmount, setFirstTokenAmount] = useState('');
  // Dummy conversion rate for display
  const convertedValue = firstTokenAmount ? `≈ $${(firstTokenAmount * 89000000).toFixed(2)}T` : '';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: isMobile ? 'auto' : '100vh',
        padding: isMobile ? '20px' : '0',
        // backgroundColor: '#cceeff',
      }}
    >
      <Card
        sx={{
          width: isMobile ? '100%' : '400px',
          padding: '20px',
          borderRadius: '16px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Tabs for Swap/}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
          {['Swap'].map((tab) => (
            <Typography
              key={tab}
              variant="body1"
              sx={{ fontWeight: 'bold', cursor: 'pointer', color: '#333' }}
            >
              {tab}
            </Typography>
          ))}
        </Box>

        {/* Token Input Fields */}
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            select
            value={firstToken}
            onChange={(e) => setFirstToken(e.target.value)}
            sx={{ mb: 1 }}
          >
            <MenuItem value="WETH">WETH</MenuItem>
            <MenuItem value="ETH">ETH</MenuItem>
          </TextField>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="0.0"
            value={firstTokenAmount}
            onChange={(e) => setFirstTokenAmount(e.target.value)}
            inputProps={{ style: { textAlign: 'right' } }}
          />
            {/* Displaying the converted value */}
            <Typography
            variant="body2"
            sx={{ textAlign: 'right', mt: 1, color: '#6b7280', fontStyle: 'italic' }}
          >
            {convertedValue}
          </Typography>
        </Box>

        {/* Arrow Indicator */}
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
          <Typography variant="h5" sx={{ color: '#333' }}>
            ↓
          </Typography>
        </Box>

        {/* Second Token Input Fields */}
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            select
            value={secondToken}
            onChange={(e) => setSecondToken(e.target.value)}
            sx={{ mb: 1 }}
          >
            <MenuItem value="DAI">DAI</MenuItem>
            <MenuItem value="USDC">USDC</MenuItem>
          </TextField>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="0.0"
            inputProps={{ style: { textAlign: 'right' } }}
          />
        </Box>

        {/* Connect Wallet Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: '#0052CC',
            color: '#fff',
            fontWeight: 'bold',
            padding: '12px',
            borderRadius: '8px',
          }}
        >
          Connect Wallet
        </Button>
      </Card>
    </Box>
  );
};

export default SwapCard;
