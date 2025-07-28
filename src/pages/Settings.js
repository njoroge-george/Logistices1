import React from 'react';
import { Box, Typography, Paper, TextField, Button} from '@mui/material';
import axios from 'axios';

export default function Settings() {
    return (
        <Box p={3}>
                <Paper sx={{ p: 2 }}>
                 <Typography>
                     Settings
                 </Typography>
                </Paper>

        </Box>
    );
}
