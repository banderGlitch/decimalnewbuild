import './Table.css';
import { useMemo } from 'react';
import { Avatar, Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import StatusCell from './StatusCall';
import ProtocolCell from './ProtocolCell';




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




const columns = [
    { field: '_id', headerName: 'Id', flex: 0.5, sortable: false, filterable: false },
    {
        field: 'Status',
        headerName: 'Status',
        flex: 1,
        sortable: false,
        filterable: false,
        renderCell: (params) => <StatusCell status={params.value} />
    },
    { field: 'Nounce', headerName: 'Nonce', flex: 1, sortable: false, filterable: false },
    { field: 'SourceTxHash', headerName: 'Source Tx Hash', flex: 2, sortable: false, filterable: false },
    { field: 'From', headerName: 'From', flex: 2, sortable: false, filterable: false },
    { field: 'DestinationTxHash', headerName: 'Destination Tx Hash', flex: 2, sortable: false, filterable: false },
    {
        field: 'Protocol',
        headerName: 'Protocol',
        flex: 1,
        sortable: false,
        filterable: false,
        renderCell: (params) => <ProtocolCell protocol={params.value} />
    },
    { field: 'Created', headerName: 'Created', flex: 1, sortable: false, filterable: false }

];


// const columns = [
//     { field: '_id', headerName: 'Id', flex: 0.5, sortable: false, filterable: false },
//     { field: 'Nounce', headerName: 'Creator', flex: 1, sortable: false, filterable: false },
//     { field: 'SourceTxHash', headerName: 'Rewards Per Execution', flex: 2, sortable: false, filterable: false },
//     { field: 'From', headerName: 'Total Rewards', flex: 2, sortable: false, filterable: false },
//     { field: 'DestinationTxHash', headerName: 'Feed', flex: 2, sortable: false, filterable: false },

// ];

const FeedsTable = ({ ...props }) => {
    return (
        <Box sx={{ height: "auto", width: "100%", }}>
            <Typography variant='h4' component='h4' sx={{ textAlign: "center", color: "white", mt: 3, mb: 3, fontFamily: "poppins" }}>
                Feeds
            </Typography>
            <DataGrid rows={rows} columns={columns} getRowId={(row) => row._id}
                sx={{
                    cursor:'pointer',
                    '& .MuiDataGrid-root': {
                        border: 'none', // Remove the border around the table
                    },
                    '& .MuiDataGrid-cell': {
                        border: 'none', // Remove the border from the cells
                    },
                    '& .MuiDataGrid-row': {
                        fontFamily: 'poppins',
                        color: 'white',
                        marginBottom: '2px', // Add spacing between rows
                        backgroundColor: '#0d4fa5', // Row background color
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                    },
                    '& .MuiDataGrid-row + .MuiDataGrid-row': {
                        marginTop: '2px', // Add spacing between rows
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        borderBottom: 'none', // Remove the bottom border of the column headers
                    },
                    '& .MuiDataGrid-footerContainer': {
                        color: 'white',
                        borderTop: 'none', 
                        '& .MuiTablePagination-root': {
                            color: 'white',
                        },
                        '& .MuiIconButton-root': {
                            color: 'white',
                        },
                        '& .Mui-disabled': {
                            color: 'rgba(255, 255, 255, 0.5)',
                        },
                    },
                }} />
        </Box>
    )
}

export default FeedsTable 