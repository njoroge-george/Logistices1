import React, { useState } from 'react';
import { Box, Typography, LinearProgress, Badge, Grid, Paper, List, ListItem, ListItemText, Button, TextField } from '@mui/material';

function Learning() {
    // Sample data for courses and achievements
    const [courses, setCourses] = useState([
        { id: 1, name: 'React Fundamentals', progress: 70 },
        { id: 2, name: 'JavaScript Basics', progress: 50 },
        { id: 3, name: 'CSS & Styling', progress: 80 },
    ]);

    const [achievements, setAchievements] = useState([
        { id: 1, label: 'React Novice' },
        { id: 2, label: 'JS Beginner' },
        { id: 3, label: 'CSS Enthusiast' },
    ]);

    const [resources] = useState([
        { id: 1, type: 'Video', title: 'React Tutorial', link: 'https://reactjs.org/tutorial' },
        { id: 2, type: 'Article', title: 'JavaScript Tips', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
        { id: 3, type: 'Video', title: 'CSS Tricks', link: 'https://css-tricks.com/' },
    ]);

    const [practiceLogs, setPracticeLogs] = useState([
        { id: 1, date: '2023-10-01', activity: 'Built a React component' },
        { id: 2, date: '2023-10-02', activity: 'Completed JS exercises' },
    ]);
    const [newLog, setNewLog] = useState('');

    const handleAddLog = () => {
        if (newLog.trim()) {
            const newEntry = {
                id: Date.now(),
                date: new Date().toLocaleDateString(),
                activity: newLog,
            };
            setPracticeLogs([newEntry, ...practiceLogs]);
            setNewLog('');
        }
    };

    return (
        <Box p={3}>
            {/* Header */}
            <Typography variant="h4" gutterBottom>Learning</Typography>

            {/* Progress Trackers */}
            <Typography variant="h5" gutterBottom>Course Progress</Typography>
            {courses.map(course => (
                <Box key={course.id} mb={2}>
                    <Typography variant="subtitle1">{course.name}</Typography>
                    <LinearProgress variant="determinate" value={course.progress} />
                </Box>
            ))}

            {/* Achievements Badges */}
            <Typography variant="h5" gutterBottom mt={4}>Achievements</Typography>
            <Box display="flex" flexWrap="wrap" gap={2} mb={4}>
                {achievements.map(ach => (
                    <Badge key={ach.id} badgeContent={ach.label} color="primary" sx={{ p: 1, borderRadius: 2 }} />
                ))}
            </Box>

            {/* Resource Library */}
            <Typography variant="h5" gutterBottom>Resource Library</Typography>
            <Grid container spacing={2} mb={4}>
                {resources.map(res => (
                    <Grid item xs={12} sm={6} md={4} key={res.id}>
                        <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Typography variant="h6">{res.title}</Typography>
                            <Typography variant="body2" color="textSecondary">Type: {res.type}</Typography>
                            <Button variant="outlined" href={res.link} target="_blank" sx={{ mt: 2 }}>Access</Button>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Practice Logs */}
            <Typography variant="h5" gutterBottom>Practice Logs</Typography>
            <Box display="flex" flexDirection="column" mb={2}>
                <TextField
                    label="New Practice Activity"
                    value={newLog}
                    onChange={(e) => setNewLog(e.target.value)}
                />
                <Button variant="contained" sx={{ mt: 1, width: 'fit-content' }} onClick={handleAddLog}>
                    Add Log
                </Button>
            </Box>
            <List>
                {practiceLogs.map(log => (
                    <ListItem key={log.id} divider>
                        <ListItemText primary={log.activity} secondary={log.date} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default Learning;