import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, List, ListItem, ListItemText, Divider, Grid } from '@mui/material';

function Projects() {
    // Kanban board data
    const [columns, setColumns] = useState({
        todo: [
            { id: 1, title: 'Design homepage', details: 'Create wireframes and mockups' },
            { id: 2, title: 'Research competitors', details: 'Analyze market leaders' },
        ],
        inProgress: [
            { id: 3, title: 'Develop login', details: 'Implement OAuth2' },
        ],
        done: [
            { id: 4, title: 'Setup repo', details: 'Initialize GitHub repository' },
        ],
    });

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDetails, setNewTaskDetails] = useState('');

    // Add new task to To Do
    const handleAddTask = () => {
        if (newTaskTitle.trim()) {
            const newTask = {
                id: Date.now(),
                title: newTaskTitle,
                details: newTaskDetails,
            };
            setColumns(prev => ({
                ...prev,
                todo: [...prev.todo, newTask],
            }));
            setNewTaskTitle('');
            setNewTaskDetails('');
        }
    };

    // Move task to another column
    const moveTask = (taskId, from, to) => {
        const task = columns[from].find(t => t.id === taskId);
        if (!task) return;
        setColumns(prev => {
            const newFrom = prev[from].filter(t => t.id !== taskId);
            const newTo = [...prev[to], task];
            return {
                ...prev,
                [from]: newFrom,
                [to]: newTo,
            };
        });
    };

    return (
        <Box p={2}>
            {/* Header */}
            <Typography variant="h4" gutterBottom>Projects & Goals</Typography>

            {/* Kanban Board */}
            <Grid container spacing={2} mb={4}>
                {/* To Do Column */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, height: '100%', backgroundColor: '#f0f0f0' }}>
                        <Typography variant="h6" gutterBottom>To Do</Typography>
                        {columns.todo.map(task => (
                            <Box key={task.id} mb={2} p={2} bgcolor="#fff" borderRadius={2} boxShadow={1}>
                                <Typography variant="subtitle1">{task.title}</Typography>
                                <Typography variant="body2">{task.details}</Typography>
                                <Button size="small" sx={{ mt: 1 }} onClick={() => moveTask(task.id, 'todo', 'inProgress')}>
                                    Move to In Progress
                                </Button>
                            </Box>
                        ))}
                        {/* Add new task */}
                        <Box mt={4}>
                            <TextField
                                label="New Task"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                fullWidth
                                sx={{ mb: 1 }}
                            />
                            <TextField
                                label="Details"
                                value={newTaskDetails}
                                onChange={(e) => setNewTaskDetails(e.target.value)}
                                fullWidth
                                sx={{ mb: 1 }}
                            />
                            <Button variant="contained" onClick={handleAddTask} fullWidth>
                                Add Task
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
                {/* In Progress Column */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, height: '100%', backgroundColor: '#f0f0f0' }}>
                        <Typography variant="h6" gutterBottom>In Progress</Typography>
                        {columns.inProgress.map(task => (
                            <Box key={task.id} mb={2} p={2} bgcolor="#fff" borderRadius={2} boxShadow={1}>
                                <Typography variant="subtitle1">{task.title}</Typography>
                                <Typography variant="body2">{task.details}</Typography>
                                <Button size="small" sx={{ mt: 1 }} onClick={() => moveTask(task.id, 'inProgress', 'done')}>
                                    Move to Done
                                </Button>
                                <Button size="small" sx={{ mt: 1, ml: 1 }} onClick={() => moveTask(task.id, 'inProgress', 'todo')}>
                                    Move to To Do
                                </Button>
                            </Box>
                        ))}
                    </Paper>
                </Grid>
                {/* Done Column */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, height: '100%', backgroundColor: '#f0f0f0' }}>
                        <Typography variant="h6" gutterBottom>Done</Typography>
                        {columns.done.map(task => (
                            <Box key={task.id} mb={2} p={2} bgcolor="#e0ffe0" borderRadius={2} boxShadow={1}>
                                <Typography variant="subtitle1">{task.title}</Typography>
                                <Typography variant="body2">{task.details}</Typography>
                                <Button size="small" sx={{ mt: 1 }} onClick={() => moveTask(task.id, 'done', 'inProgress')}>
                                    Move to In Progress
                                </Button>
                            </Box>
                        ))}
                    </Paper>
                </Grid>
            </Grid>

            {/* Milestones Section */}
            <Typography variant="h5" gutterBottom>Milestones</Typography>
            <Paper sx={{ p: 2, mb: 4 }}>
                <Typography>Define key milestones for your project here.</Typography>
                {/* Placeholder for milestone management */}
                <List>
                    <ListItem>
                        <ListItemText primary="Complete wireframes" secondary="Due: Next week" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Launch MVP" secondary="Due: End of month" />
                    </ListItem>
                </List>
            </Paper>

            {/* Attachments and Notes */}
            <Typography variant="h5" gutterBottom>Attachments & Notes</Typography>
            <Grid container spacing={2}>
                {/* Attachments */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, height: 200 }}>
                        <Typography variant="h6">Attachments</Typography>
                        <Typography variant="body2" color="textSecondary">
                            Upload or link files here.
                        </Typography>
                        {/* For full functionality, you'd add file upload logic */}
                    </Paper>
                </Grid>
                {/* Notes */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, height: 200 }}>
                        <Typography variant="h6">Notes</Typography>
                        <TextField
                            multiline
                            rows={8}
                            fullWidth
                            placeholder="Write notes here..."
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Projects;