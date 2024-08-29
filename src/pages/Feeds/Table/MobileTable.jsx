import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, TextField, InputAdornment, IconButton, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import './MobileTable.css'

// Data extracted from your screenshot
const data = [
    { id: 1, status: 'Delivered', nonce: '1200043', sourceTxHash: '0x9d8a9728ceed64bd9fc0f07..', from: '0x9d8a9728ceed64bd9fc0f07..', destinationTxHash: '0x9d8a9728ceed64bd9fc0f07..', protocol: 'Stargate', created: '1 day ago' },
    { id: 2, status: 'Inflight', nonce: '1200043', sourceTxHash: '0x9d8a9728ceed64bd9fc0f07..', from: '0x9d8a9728ceed64bd9fc0f07..', destinationTxHash: '0x9d8a9728ceed64bd9fc0f07..', protocol: 'Stargate', created: '1 day ago' },
    { id: 3, status: 'Delivered', nonce: '1200043', sourceTxHash: '0x9d8a9728ceed64bd9fc0f07..', from: '0x9d8a9728ceed64bd9fc0f07..', destinationTxHash: '0x9d8a9728ceed64bd9fc0f07..', protocol: 'Testnet Bridge', created: '1 day ago' },
    { id: 4, status: 'Inflight', nonce: '1200043', sourceTxHash: '0x9d8a9728ceed64bd9fc0f07..', from: '0x9d8a9728ceed64bd9fc0f07..', destinationTxHash: '0x9d8a9728ceed64bd9fc0f07..', protocol: 'Merkly', created: '1 day ago' },
    { id: 5, status: 'Delivered', nonce: '1200043', sourceTxHash: '0x9d8a9728ceed64bd9fc0f07..', from: '0x9d8a9728ceed64bd9fc0f07..', destinationTxHash: '0x9d8a9728ceed64bd9fc0f07..', protocol: 'Stargate', created: '1 day ago' },
    { id: 6, status: 'Inflight', nonce: '1200043', sourceTxHash: '0x9d8a9728ceed64bd9fc0f07..', from: '0x9d8a9728ceed64bd9fc0f07..', destinationTxHash: '0x9d8a9728ceed64bd9fc0f07..', protocol: 'Osaka Protocol', created: '1 day ago' },
    { id: 7, status: 'Delivered', nonce: '1200043', sourceTxHash: '0x9d8a9728ceed64bd9fc0f07..', from: '0x9d8a9728ceed64bd9fc0f07..', destinationTxHash: '0x9d8a9728ceed64bd9fc0f07..', protocol: 'Stargate', created: '1 day ago' },
    { id: 8, status: 'Inflight', nonce: '1200043', sourceTxHash: '0x9d8a9728ceed64bd9fc0f07..', from: '0x9d8a9728ceed64bd9fc0f07..', destinationTxHash: '0x9d8a9728ceed64bd9fc0f07..', protocol: 'Fuse Bridge', created: '1 day ago' },
];

const MobileTable = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const isMobile = useMediaQuery('(max-width:400px)');

    // Filter data based on the search query
    const filteredData = data.filter((item) =>
        item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.protocol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sourceTxHash.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!isMobile) {
        return <div />; // Return nothing for non-mobile screens
    }

    return (
        <Box p={2} sx={{ overflowX: 'auto' }}>
            {/* <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <SearchIcon sx={{ fontSize: 30, color: 'orange' }} />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                sx={{
                    marginBottom: 2,
                    fontFamily: 'Poppins',
                    '& .MuiInputBase-root': {
                        color: "white",
                        fontFamily: 'Poppins'
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: "white !important"
                    },
                    '& .MuiInputLabel-root': {
                        color: 'white',
                        fontFamily: 'Poppins'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: "white"
                    },
                    '& .Mui-focused .MuiInputLabel-root': {
                        borderColor: "white"
                    },
                }}
            /> */}
            <TableContainer component={Paper} sx={{  width: '31%;', overflowX: 'auto' }}>
                <Table size="small"  sx={{ minWidth: '600px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontFamily: 'Poppins' }}>Id</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppins' }}>Status</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppins' }}>Nonce</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppins' }}>Source Tx Hash</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppins' }}>From</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppins' }}>Destination Tx Hash</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppins' }}>Protocol</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppins' }}>Created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell sx={{ fontFamily: 'Poppins' }}>{index + 1}</TableCell>
                                <TableCell sx={{ fontFamily: 'Poppins', color: row.status === 'Delivered' ? 'green' : 'pink' }}>
                                    {row.status}
                                </TableCell>
                                <TableCell sx={{ fontFamily: 'Poppins' }}>{row.nonce}</TableCell>
                                <TableCell sx={{ fontFamily: 'Poppins' }}>
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="body2" sx={{ fontFamily: 'Poppins', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.sourceTxHash}</Typography>
                                        <IconButton onClick={() => navigator.clipboard.writeText(row.sourceTxHash)} sx={{ ml: 1 }}>
                                            <FileCopyIcon sx={{ fontSize: 18, color: 'white' }} />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ fontFamily: 'Poppins' }}>
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="body2" sx={{ fontFamily: 'Poppins', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.from}</Typography>
                                        <IconButton onClick={() => navigator.clipboard.writeText(row.from)} sx={{ ml: 1 }}>
                                            <FileCopyIcon sx={{ fontSize: 18, color: 'white' }} />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ fontFamily: 'Poppins' }}>
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="body2" sx={{ fontFamily: 'Poppins', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.destinationTxHash}</Typography>
                                        <IconButton onClick={() => navigator.clipboard.writeText(row.destinationTxHash)} sx={{ ml: 1 }}>
                                            <FileCopyIcon sx={{ fontSize: 18, color: 'white' }} />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ fontFamily: 'Poppins' }}>{row.protocol}</TableCell>
                                <TableCell sx={{ fontFamily: 'Poppins' }}>{row.created}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default MobileTable;

// import React, { useState } from 'react';
// import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, TextField, InputAdornment, IconButton, useMediaQuery } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import FileCopyIcon from '@mui/icons-material/FileCopy';

// // Data extracted from your screenshot
// const data = [
//     { id: 1, status: 'Delivered', nonce: '1200043', sourceTxHash: '0x9d8a9728ceed64bd9fc0f07..', from: '0x9d8a9728ceed64bd9fc0f07..', destinationTxHash: '0x9d8a9728ceed64bd9fc0f07..', protocol: 'Stargate', created: '1 day ago' },
//     { id: 2, status: 'Inflight', nonce: '1200043', sourceTxHash: '0x9d8a9728ceed64bd9fc0f07..', from: '0x9d8a9728ceed64bd9fc0f07..', destinationTxHash: '0x9d8a9728ceed64bd9fc0f07..', protocol: 'Stargate', created: '1 day ago' },
//     { id: 3, status: 'Delivered', nonce: '1200043', sourceTxHash: '0x9d8a9728ceed64bd9fc0f07..', from: '0x9d8a9728ceed64bd9fc0f07..', destinationTxHash: '0x9d8a9728ceed64bd9fc0f07..', protocol: 'Testnet Bridge', created: '1 day ago' },
//     { id: 4, status: 'Inflight', nonce: '1200043', sourceTxHash: '0x9d8a9728ceed64bd9fc0f07..', from: '0x9d8a9728ceed64bd9fc0f07..', destinationTxHash: '0x9d8a9728ceed64bd9fc0f07..', protocol: 'Merkly', created: '1 day ago' },
//     { id: 5, status: 'Delivered', nonce: '1200043', sourceTxHash: '0x9d8a9728ceed64bd9fc0f07..', from: '0x9d8a9728ceed64bd9fc0f07..', destinationTxHash: '0x9d8a9728ceed64bd9fc0f07..', protocol: 'Stargate', created: '1 day ago' },
//     { id: 6, status: 'Inflight', nonce: '1200043', sourceTxHash: '0x9d8a9728ceed64bd9fc0f07..', from: '0x9d8a9728ceed64bd9fc0f07..', destinationTxHash: '0x9d8a9728ceed64bd9fc0f07..', protocol: 'Osaka Protocol', created: '1 day ago' },
//     { id: 7, status: 'Delivered', nonce: '1200043', sourceTxHash: '0x9d8a9728ceed64bd9fc0f07..', from: '0x9d8a9728ceed64bd9fc0f07..', destinationTxHash: '0x9d8a9728ceed64bd9fc0f07..', protocol: 'Stargate', created: '1 day ago' },
//     { id: 8, status: 'Inflight', nonce: '1200043', sourceTxHash: '0x9d8a9728ceed64bd9fc0f07..', from: '0x9d8a9728ceed64bd9fc0f07..', destinationTxHash: '0x9d8a9728ceed64bd9fc0f07..', protocol: 'Fuse Bridge', created: '1 day ago' },
// ];

// const MobileTable = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const isMobile = useMediaQuery('(max-width:600px)');

//     // Filter data based on the search query
//     const filteredData = data.filter((item) =>
//         item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.protocol.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.sourceTxHash.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     if (!isMobile) {
//         return <div />; // Return nothing for non-mobile screens
//     }

//     return (
//         <Box p={2}>
//             <TextField
//                 label="Search"
//                 variant="outlined"
//                 fullWidth
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 InputProps={{
//                     endAdornment: (
//                         <InputAdornment position="end">
//                             <IconButton>
//                                 <SearchIcon sx={{ fontSize: 30, color: 'orange' }} />
//                             </IconButton>
//                         </InputAdornment>
//                     )
//                 }}
//                 sx={{
//                     marginBottom: 2,
//                     fontFamily: 'Poppins',
//                     '& .MuiInputBase-root': {
//                         color: "white",
//                         fontFamily: 'Poppins'
//                     },
//                     '& .MuiOutlinedInput-notchedOutline': {
//                         borderColor: "white !important"
//                     },
//                     '& .MuiInputLabel-root': {
//                         color: 'white',
//                         fontFamily: 'Poppins'
//                     },
//                     '&:hover .MuiOutlinedInput-notchedOutline': {
//                         borderColor: 'white',
//                     },
//                     '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                         borderColor: "white"
//                     },
//                     '& .Mui-focused .MuiInputLabel-root': {
//                         borderColor: "white"
//                     },
//                 }}
//             />
//             <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
//                 <Table size="small">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell sx={{ fontFamily: 'Poppins' }}>Id</TableCell>
//                             <TableCell sx={{ fontFamily: 'Poppins' }}>Status</TableCell>
//                             <TableCell sx={{ fontFamily: 'Poppins' }}>Nonce</TableCell>
//                             <TableCell sx={{ fontFamily: 'Poppins' }}>Source Tx Hash</TableCell>
//                             <TableCell sx={{ fontFamily: 'Poppins' }}>From</TableCell>
//                             <TableCell sx={{ fontFamily: 'Poppins' }}>Destination Tx Hash</TableCell>
//                             <TableCell sx={{ fontFamily: 'Poppins' }}>Protocol</TableCell>
//                             <TableCell sx={{ fontFamily: 'Poppins' }}>Created</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {filteredData.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell sx={{ fontFamily: 'Poppins' }}>{index + 1}</TableCell>
//                                 <TableCell sx={{ fontFamily: 'Poppins', color: row.status === 'Delivered' ? 'green' : 'pink' }}>
//                                     {row.status}
//                                 </TableCell>
//                                 <TableCell sx={{ fontFamily: 'Poppins' }}>{row.nonce}</TableCell>
//                                 <TableCell sx={{ fontFamily: 'Poppins' }}>
//                                     <Box display="flex" alignItems="center">
//                                         <Typography variant="body2" sx={{ fontFamily: 'Poppins', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.sourceTxHash}</Typography>
//                                         <IconButton onClick={() => navigator.clipboard.writeText(row.sourceTxHash)} sx={{ ml: 1 }}>
//                                             <FileCopyIcon sx={{ fontSize: 18, color: 'white' }} />
//                                         </IconButton>
//                                     </Box>
//                                 </TableCell>
//                                 <TableCell sx={{ fontFamily: 'Poppins' }}>
//                                     <Box display="flex" alignItems="center">
//                                         <Typography variant="body2" sx={{ fontFamily: 'Poppins', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.from}</Typography>
//                                         <IconButton onClick={() => navigator.clipboard.writeText(row.from)} sx={{ ml: 1 }}>
//                                             <FileCopyIcon sx={{ fontSize: 18, color: 'white' }} />
//                                         </IconButton>
//                                     </Box>
//                                 </TableCell>
//                                 <TableCell sx={{ fontFamily: 'Poppins' }}>
//                                     <Box display="flex" alignItems="center">
//                                         <Typography variant="body2" sx={{ fontFamily: 'Poppins', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.destinationTxHash}</Typography>
//                                         <IconButton onClick={() => navigator.clipboard.writeText(row.destinationTxHash)} sx={{ ml: 1 }}>
//                                             <FileCopyIcon sx={{ fontSize: 18, color: 'white' }} />
//                                         </IconButton>
//                                     </Box>
//                                 </TableCell>
//                                 <TableCell sx={{ fontFamily: 'Poppins' }}>{row.protocol}</TableCell>
//                                 <TableCell sx={{ fontFamily: 'Poppins' }}>{row.created}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Box>
//     );
// };

// export default MobileTable;

// import React, { useState } from 'react';
// import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, TextField, InputAdornment, IconButton, useMediaQuery } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// // Mock Data (similar to your example)
// const data = [
//     { id: 1, symbol: 'BTC', name: 'Bitcoin', marketCap: '1.26T', price: '$63,961.66', change: '-0.60%', color: 'red' },
//     { id: 2, symbol: 'ETH', name: 'Ethereum', marketCap: '330.98B', price: '$2,752.21', change: '-0.81%', color: 'red' },
//     { id: 3, symbol: 'USDT', name: 'Tether', marketCap: '117.92B', price: '$1.00', change: '0.01%', color: 'green' },
//     { id: 4, symbol: 'BNB', name: 'Binance Coin', marketCap: '83.75B', price: '$574.07', change: '-1.30%', color: 'red' },
//     { id: 5, symbol: 'SOL', name: 'Solana', marketCap: '73.21B', price: '$157.19', change: '1.16%', color: 'green' },
//     { id: 6, symbol: 'USDC', name: 'USD Coin', marketCap: '34.84B', price: '$0.9999', change: '0.01%', color: 'green' },
//     { id: 7, symbol: 'XRP', name: 'XRP', marketCap: '33.77B', price: '$0.6013', change: '-1.37%', color: 'red' },
//     { id: 8, symbol: 'DOGE', name: 'Dogecoin', marketCap: '15.90B', price: '$0.1091', change: '-3.17%', color: 'red' },
//     { id: 9, symbol: 'TRX', name: 'TRON', marketCap: '13.98B', price: '$0.1601', change: '0.09%', color: 'green' }
// ];

// const MobileTable = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const isMobile = useMediaQuery('(max-width:600px)');

//     // Filter data based on the search query
//     const filteredData = data.filter((item) =>
//         item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     if (!isMobile) {
//         return <div />; // Return nothing for non-mobile screens
//     }

//     return (
//         <Box p={2}>
//             <TextField
//                 label="Search"
//                 variant="outlined"
//                 fullWidth
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 InputProps={{
//                     endAdornment: (
//                         <InputAdornment position="end">
//                             <IconButton>
//                                 <SearchIcon  sx={{ fontSize: 30, color: 'orange' }}  />
//                             </IconButton>
//                         </InputAdornment>
//                     )
//                 }}
//                 sx={{
//                     marginBottom: 2,
//                     '& .MuiInputBase-root': {
//                       color: "white"
//                   },
//                   '& .MuiOutlinedInput-notchedOutline': {
//                       borderColor: "white !important"
//                   },
//                   '& .MuiInputLabel-root': {
//                       color: 'white'

//                   },
//                   '&:hover .MuiOutlinedInput-notchedOutline': {
//                       borderColor: 'white',
//                   },
//                   '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
//                       borderColor: "white"
//                   },
//                   '& .Mui-focused .MuiInputLabel-root': {
//                       borderColor: "white"
//                   },
//                 }}
//             />
//             <TableContainer component={Paper}>
//                 <Table size="small">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>#</TableCell>
//                             <TableCell>Market Cap</TableCell>
//                             <TableCell>Price</TableCell>
//                             <TableCell>24h %</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {filteredData.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell  sx={{ fontFamily: 'Poppins' }}>
//                                     <Typography variant="body2" sx={{ fontFamily: 'Poppins' }}>{index + 1}</Typography>
//                                     <Box display="flex" alignItems="center">
//                                         <Typography variant="body2" sx={{ fontFamily: 'Poppins' }}>{row.symbol}</Typography>
//                                         <Typography variant="body2" ml={1} color="textSecondary" sx={{ fontFamily: 'Poppins' }}>
//                                             {row.name}
//                                         </Typography>
//                                     </Box>
//                                 </TableCell>
//                                 <TableCell sx={{ fontFamily: 'Poppins' }}>
//                                     <Typography variant="body2" sx={{ fontFamily: 'Poppins' }}>{row.marketCap}</Typography>
//                                 </TableCell>
//                                 <TableCell  sx={{ fontFamily: 'Poppins' }}>
//                                     <Typography variant="body2"  sx={{ fontFamily: 'Poppins' }}>{row.price}</Typography>
//                                 </TableCell>
//                                 <TableCell>
//                                     <Typography variant="body2" color={row.color}>
//                                         {row.change}
//                                     </Typography>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Box>
//     );
// };

// export default MobileTable;


// // import React from 'react'
// // import './MobileTable.css'

// // export default function MobileTable() {
// //   return (
// //     <div>
// //         <p>This is text</p>
      
// //     </div>
// //   )
// // }


