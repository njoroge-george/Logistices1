import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    TextField,
    Alert,
    Grid,
    Paper,
    Divider,
} from '@mui/material';
import axios from 'axios';
import Form from '../components/Form';
import List from '../components/List';

const API_URL = 'http://localhost:5000/api/workouts';

export default function Fitness({ fetchWorkouts }) {
    const [workouts, setWorkouts] = useState([]);
    const [workoutToEdit, setWorkoutToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        loadWorkouts();
    }, []);

    const loadWorkouts = async () => {
        try {
            setError('');
            const res = await axios.get(API_URL);
            setWorkouts(res.data);
        } catch (err) {
            setError('❗️ Failed to load workouts. Please try again later.');
        }
    };

    const handleAddOrUpdate = async (id, data) => {
        try {
            setError('');
            if (id) {
                await axios.put(`${API_URL}/${id}`, data);
            } else {
                await axios.post(API_URL, data);
            }
            await loadWorkouts();
            await fetchWorkouts();
            setWorkoutToEdit(null);
        } catch (err) {
            setError('❗️ Error saving workout. Please check your data.');
        }
    };

    const handleDelete = async (id) => {
        try {
            setError('');
            await axios.delete(`${API_URL}/${id}`);
            await loadWorkouts();
            await fetchWorkouts();
        } catch (err) {
            setError('❗️ Error deleting workout.');
        }
    };

    const handleUpdate = async (data) => {
        try {
            setError('');
            await axios.put(`${API_URL}/${data.id}`, data);
            await loadWorkouts();
            await fetchWorkouts();
        } catch (err) {
            setError('❗️ Error updating workout.');
        }
    };

    const filteredWorkouts = workouts.filter(
        (w) =>
            w.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            w.type?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" sx={{ my: 3 }}>
                💪 BodyFit - Manage Workouts
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    ➕ Add / Edit Workout
                </Typography>
                <Form onAdd={handleAddOrUpdate} workoutToEdit={workoutToEdit} />
            </Paper>

            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={8}>
                        <Typography variant="h6">📋 Workout List</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Search Workouts"
                            variant="outlined"
                            fullWidth
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <List
                    workouts={filteredWorkouts}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    onEdit={setWorkoutToEdit}
                />
            </Paper>
        </Container>
    );
}
