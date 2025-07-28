import React, { useState } from 'react';
import {
    Box, Button, TextField, Typography, Paper
} from '@mui/material';
import { useAuth } from '../components/AuthContext';

export default function LoginPage() {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Paper sx={{ p: 4, width: 300 }}>
                <Typography variant="h5" mb={2}>Login</Typography>
                <TextField
                    fullWidth label="Username" value={username}
                    onChange={(e) => setUsername(e.target.value)} margin="normal"
                />
                <TextField
                    fullWidth label="Password" type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} margin="normal"
                />
                <Button
                    fullWidth variant="contained" color="primary"
                    onClick={() => login(username, password)} sx={{ mt: 2 }}
                >
                    Login
                </Button>
            </Paper>
        </Box>
    );
}
