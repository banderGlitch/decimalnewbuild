import './Table.css';
import { useMemo, useEffect, useState } from 'react';
import { Avatar, Box, Typography, TextField, InputAdornment, ThemeProvider, Switch, useTheme } from '@mui/material'
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import StatusCell from './StatusCall';
import { darkTheme, lightTheme } from '../../../helper/theme';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ProtocolCell from './ProtocolCell';
import SearchIcon from '@mui/icons-material/Search';




const rows = [
    { _id: 1, Status: 'Delivered', Nounce: '1200043', SourceTxHash: "0x9d8a9728ceed64bd9fc0f07..", From: "0x9d8a9728ceed64bd9fc0f07..", DestinationTxHash: "0x9d8a9728ceed64bd9fc0f07..", Protocol: "Stargate", Created: "1 day ago" },
    { _id: 2, Status: 'Inflight', Nounce: '1200043', SourceTxHash: "0x9d8a9728ceed64bd9fc0f07..", From: "0x9d8a9728ceed64bd9fc0f07..", DestinationTxHash: "0x9d8a9728ceed64bd9fc0f07..", Protocol: "Stargate", Created: "1 day ago" },
    { _id: 3, Status: 'Delivered', Nounce: '1200043', SourceTxHash: "0x9d8a9728ceed64bd9fc0f07..", From: "0x9d8a9728ceed64bd9fc0f07..", DestinationTxHash: "0x9d8a9728ceed64bd9fc0f07..", Protocol: "Testnet Bridge", Created: "1 day ago" },
    { _id: 4, Status: 'Inflight', Nounce: '1200043', SourceTxHash: "0x9d8a9728ceed64bd9fc0f07..", From: "0x9d8a9728ceed64bd9fc0f07..", DestinationTxHash: "0x9d8a9728ceed64bd9fc0f07..", Protocol: "Merkly", Created: "1 day ago" },
    { _id: 5, Status: 'Delivered', Nounce: '1200043', SourceTxHash: "0x9d8a9728ceed64bd9fc0f07..", From: "0x9d8a9728ceed64bd9fc0f07..", DestinationTxHash: "0x9d8a9728ceed64bd9fc0f07..", Protocol: "Stargate", Created: "1 day ago" },
    { _id: 6, Status: 'Inflight', Nounce: '1200043', SourceTxHash: "0x9d8a9728ceed64bd9fc0f07..", From: "0x9d8a9728ceed64bd9fc0f07..", DestinationTxHash: "0x9d8a9728ceed64bd9fc0f07..", Protocol: "Osaka Protocol", Created: "1 day ago" },
    { _id: 7, Status: 'Delivered', Nounce: '1200043', SourceTxHash: "0x9d8a9728ceed64bd9fc0f07..", From: "0x9d8a9728ceed64bd9fc0f07..", DestinationTxHash: "0x9d8a9728ceed64bd9fc0f07..", Protocol: "Stargate", Created: "1 day ago" },
    { _id: 8, Status: 'Inflight', Nounce: '1200043', SourceTxHash: "0x9d8a9728ceed64bd9fc0f07..", From: "0x9d8a9728ceed64bd9fc0f07..", DestinationTxHash: "0x9d8a9728ceed64bd9fc0f07..", Protocol: "Fuse Bridge", Created: "1 day ago" },
];




// const columns = [
//     { field: '_id', headerName: 'Id', flex: 0.5, sortable: false, filterable: false },
//     {
//         field: 'Status',
//         headerName: 'Status',
//         flex: 1,
//         sortable: false,
//         filterable: false,
//         renderCell: (params) => <StatusCell status={params.value} />
//     },
//     { field: 'Nounce', headerName: 'Nonce', flex: 1, sortable: false, filterable: false },
//     { field: 'SourceTxHash', headerName: 'Source Tx Hash', flex: 2, sortable: false, filterable: false },
//     { field: 'From', headerName: 'From', flex: 2, sortable: false, filterable: false },
//     { field: 'DestinationTxHash', headerName: 'Destination Tx Hash', flex: 2, sortable: false, filterable: false },
//     {
//         field: 'Protocol',
//         headerName: 'Protocol',
//         flex: 1,
//         sortable: false,
//         filterable: false,
//         renderCell: (params) => <ProtocolCell protocol={params.value} />
//     },
//     { field: 'Created', headerName: 'Created', flex: 1, sortable: false, filterable: false }

// ];

// const columns = [
//     { field: '_id', headerName: 'Id', flex: 0.5, sortable: false, filterable: false },
//     {
//         field: 'Status',
//         headerName: 'Status',
//         flex: 1,
//         sortable: false,
//         filterable: false,
//         renderCell: (params) => <StatusCell status={params.value} />
//     },
//     { field: 'Nounce', headerName: 'Nonce', flex: 1, sortable: false, filterable: false },
//     {
//         field: 'SourceTxHash',
//         headerName: 'Source Tx Hash',
//         flex: 2,
//         sortable: false,
//         filterable: false,
//         renderCell: (params) => (
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 {params.value}
//                 <Tooltip title="Copy" arrow>
//                     <IconButton onClick={() => navigator.clipboard.writeText(params.value)}>
//                         <FileCopyIcon sx={{ ml: 1, color: 'white' }} />
//                     </IconButton>
//                 </Tooltip>
//             </Box>
//         )
//     },
//     {
//         field: 'From',
//         headerName: 'From',
//         flex: 2,
//         sortable: false,
//         filterable: false,
//         renderCell: (params) => (
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 {params.value}
//                 <Tooltip title="Copy" arrow>
//                     <IconButton onClick={() => navigator.clipboard.writeText(params.value)}>
//                         <FileCopyIcon sx={{ ml: 1, color: 'white' }} />
//                     </IconButton>
//                 </Tooltip>
//             </Box>
//         )
//     },
//     {
//         field: 'DestinationTxHash',
//         headerName: 'Destination Tx Hash',
//         flex: 2,
//         sortable: false,
//         filterable: false,
//         renderCell: (params) => (
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 {params.value}
//                 <Tooltip title="Copy" arrow>
//                     <IconButton onClick={() => navigator.clipboard.writeText(params.value)}>
//                         <FileCopyIcon sx={{ ml: 1, color: 'white' }} />
//                     </IconButton>
//                 </Tooltip>
//             </Box>
//         )
//     },
//     {
//         field: 'Protocol',
//         headerName: 'Protocol',
//         flex: 1,
//         sortable: false,
//         filterable: false,
//         renderCell: (params) => <ProtocolCell protocol={params.value} />
//     },
//     { field: 'Created', headerName: 'Created', flex: 1, sortable: false, filterable: false }
// ];

const columns = [
    { field: '_id', headerName: 'Id', flex: 0.9, sortable: false, filterable: false, sortable: true, filterable: false },
    {
        field: 'Status',
        headerName: 'Status',
        flex: 1,
        sortable: false,
        filterable: false,
        renderCell: (params) => <StatusCell status={params.value} />
    },
    { field: 'Nounce', headerName: 'Nonce', flex: 1, sortable: false, filterable: false, sortable: true, filterable: false },
    {
        field: 'SourceTxHash',
        headerName: 'Source Tx Hash',
        flex: 2,
        sortable: true,
        filterable: false,
        renderCell: (params) => (
            <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                <Typography variant="body2" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: "poppins", position: "relative", top: "2px" }}>
                    {params.value}
                </Typography>
                <Tooltip title="Copy" arrow>
                    <IconButton onClick={() => navigator.clipboard.writeText(params.value)}>
                        <FileCopyIcon sx={{ ml: 1, color: useTheme().palette.action.color, zIndex: 1 }} />
                    </IconButton>
                </Tooltip>
            </Box>
        )
    },
    {
        field: 'From',
        headerName: 'From',
        flex: 2,
        sortable: true,
        filterable: false,
        renderCell: (params) => (
            <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                <Typography variant="body2" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: "poppins", position: "relative", top: "2px" }}>
                    {params.value}
                </Typography>
                <Tooltip title="Copy" arrow>
                    <IconButton onClick={() => navigator.clipboard.writeText(params.value)}>
                        <FileCopyIcon sx={{ ml: 1, color: useTheme().palette.action.color, zIndex: 1 }} />
                    </IconButton>
                </Tooltip>
            </Box>
        )
    },
    {
        field: 'DestinationTxHash',
        headerName: 'Destination Tx Hash',
        flex: 2,
        sortable: true,
        filterable: false,
        renderCell: (params) => (
            <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                <Typography variant="body2" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: "poppins", fontFamily: "poppins", position: "relative", top: "2px" }}>
                    {params.value}
                </Typography>
                <Tooltip title="Copy" arrow>
                    <IconButton onClick={() => navigator.clipboard.writeText(params.value)}>
                        <FileCopyIcon sx={{ ml: 1, color: useTheme().palette.action.color, zIndex: 1 }} />
                    </IconButton>
                </Tooltip>
            </Box>
        )
    },
    {
        field: 'Protocol',
        headerName: 'Protocol',
        flex: 1,
        sortable: false,
        filterable: false,
        renderCell: (params) => <ProtocolCell protocol={params.value} />
    },
    { field: 'Created', headerName: 'Created', flex: 1, sortable: true, filterable: false }
];



const CustomToolbar = () => {
    return (
        <GridToolbarContainer sx={{ height: "60px", fontFamily: "poppins", alignItems: 'center', display: "flex", justifyContent: "flex-end" }}>
            <GridToolbarColumnsButton sx={{ color: 'red' }} />
            <Box sx={{ flexGrow: 1 }} />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
};







// const columns = [
//     { field: '_id', headerName: 'Id', flex: 0.5, sortable: false, filterable: false },
//     { field: 'Nounce', headerName: 'Creator', flex: 1, sortable: false, filterable: false },
//     { field: 'SourceTxHash', headerName: 'Rewards Per Execution', flex: 2, sortable: false, filterable: false },
//     { field: 'From', headerName: 'Total Rewards', flex: 2, sortable: false, filterable: false },
//     { field: 'DestinationTxHash', headerName: 'Feed', flex: 2, sortable: false, filterable: false },

// ];

const FeedsTable = ({ ...props }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [theme, setTheme] = useState(darkTheme); // State to manage the theme;


    const filteredRows = useMemo(() => {
        // Implement your filtering logic here
    }, [searchQuery]);

    const handleThemeChange = () => {
        setTheme(theme.palette.mode === 'dark' ? lightTheme : darkTheme);
    };



    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ height: "auto", width: "100%", }}>
                <Typography variant='h4' component='h4' sx={{ textAlign: "center", color: "white", mt: 3, mb: 3, fontFamily: "poppins" }}>
                    Feeds
                </Typography>
                <Switch
                    checked={theme.palette.mode === 'light'}
                    onChange={handleThemeChange}
                    color="default"
                    label="Theme"
                    inputProps={{ 'aria-label': 'theme switch' }}
                />
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    fullWidth
                    sx={{
                        marginBottom: 2,
                        '& .MuiInputBase-root': {
                            color: "white"
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: "white !important"
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white'

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
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton>
                                    <SearchIcon sx={{ fontSize: 30, color: 'orange' }} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row._id}
                    slots={{
                        toolbar: () => (
                            <CustomToolbar />
                        ),
                    }}
                    sx={{
                        fontFamily: "poppins",
                        cursor: 'pointer',
                        '& .MuiDataGrid-root': {
                            border: 'none',
                        },
                        '& .MuiDataGrid-cell': {
                            border: 'none',
                        },
                        '& .MuiDataGrid-row': {
                            fontFamily: 'poppins',
                            marginBottom: '2px',
                            backgroundColor: theme.palette.background.default,
                            '&:hover': {
                                backgroundColor: theme.palette.hover.color, // Use theme's hover color
                            },
                        },
                        '& .MuiDataGrid-row + .MuiDataGrid-row': {
                            marginTop: '2px',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            borderBottom: 'none',
                        },
                        '& .MuiDataGrid-footerContainer': {
                            color: "white",
                            borderTop: 'none',
                            '& .MuiTablePagination-root': {
                                color: "white",
                            },
                            '& .MuiIconButton-root': {
                                color: "white",
                            },
                            '& .Mui-disabled': {
                                color: 'rgba(255, 255, 255, 0.5)',
                            },
                        },
                    }}
                />
            </Box>
        </ThemeProvider>
        // <Box sx={{ height: "auto", width: "100%", }}>
        //     <Typography variant='h4' component='h4' sx={{ textAlign: "center", color: "white", mt: 3, mb: 3, fontFamily: "poppins" }}>
        //         Feeds
        //     </Typography>
        //     <TextField
        //         label="Search"
        //         variant="outlined"
        //         value={searchQuery}
        //         onChange={(e) => setSearchQuery(e.target.value)}
        //         fullWidth
        //         sx={{ marginBottom: 2,
        //             '& .MuiInputBase-root': {
        //                 color: 'white !important', 
        //             },
        //             '& .MuiOutlinedInput-notchedOutline': {
        //                 borderColor: 'white !important',
        //             },
        //             '& .MuiInputLabel-root': {
        //                 color: 'white !important', 
        //             },
        //             '&:hover .MuiOutlinedInput-notchedOutline': {
        //                 borderColor: 'white !important', // Hover border color
        //             },
        //             '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
        //                 borderColor: 'white !important', // Focused border color
        //             },
        //             '& .Mui-focused .MuiInputLabel-root': {
        //                 color: 'white !important', // Focused label color
        //             },
        //             '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        //                 borderColor: 'white !important', // Hover border color
        //             },
        //             '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
        //                 borderColor: 'white !important', // Focused border color
        //             },
        //             '& .Mui-focused .MuiInputLabel-root': {
        //                 color: 'white !important', // Focused label color
        //             },
        //          }}
        //         InputProps={{
        //             endAdornment : (
        //                 <InputAdornment  position='end'>
        //                     <IconButton>
        //                         <SearchIcon sx = {{color:"#F15A24"}}/>
        //                     </IconButton>
        //                 </InputAdornment>
        //             )
        //         }}
        //     />
        //     <DataGrid rows={rows} columns={columns} getRowId={(row) => row._id}
        //         slots={{
        //             toolbar: () => (
        //                 <CustomToolbar
        //                     // startDate={startDate}
        //                     // setStartDate={setStartDate}
        //                     // endDate={endDate}
        //                     // setEndDate={setEndDate}
        //                     // handleFilter={handleFilter}
        //                 />
        //             ),
        //         }}
        //         sx={{
        //             fontFamily:"poppins",
        //             cursor: 'pointer',
        //             '& .MuiDataGrid-root': {
        //                 border: 'none',
        //             },
        //             '& .MuiDataGrid-cell': {
        //                 border: 'none',
        //             },
        //             '& .MuiDataGrid-row': {
        //                 fontFamily: 'poppins',
        //                 color: 'white',
        //                 marginBottom: '2px',
        //                 backgroundColor: '#0d4fa5',
        //                 '&:hover': {
        //                     backgroundColor: 'rgba(255, 255, 255, 0.1)',
        //                 },
        //             },
        //             '& .MuiDataGrid-row + .MuiDataGrid-row': {
        //                 marginTop: '2px',
        //             },
        //             '& .MuiDataGrid-columnHeaders': {
        //                 borderBottom: 'none',
        //                 color: 'yellow', // Change the column header text color
        //                 '& .MuiDataGrid-sortIcon': {
        //                     color: 'yellow', // Change the sort icon color
        //                 }
        //             },
        //             '& .MuiDataGrid-columnHeaders': {
        //                 borderBottom: 'none',
        //             },
        //             '& .MuiDataGrid-footerContainer': {
        //                 color: 'white',
        //                 borderTop: 'none',
        //                 '& .MuiTablePagination-root': {
        //                     color: 'white',
        //                 },
        //                 '& .MuiIconButton-root': {
        //                     color: 'white',
        //                 },
        //                 '& .Mui-disabled': {
        //                     color: 'rgba(255, 255, 255, 0.5)',
        //                 },
        //             },
        //         }} />
        // </Box>
    )
}

export default FeedsTable 