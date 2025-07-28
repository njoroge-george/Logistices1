import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function Contacts() {
    return (
        <Box p={2}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h4">Finance Overview</Typography>
                <Typography mt={2}>
                    This is placeholder content for Finance Logistics. You can build custom components or logic here.
                </Typography>
            </Paper>
        </Box>
    );
}
