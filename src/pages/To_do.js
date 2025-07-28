import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Checkbox, Button, TextField, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function To_do() {
    // Task data
    const initialTasks = [
        { id: '1', title: 'Buy groceries', dueDate: '2023-10-10', priority: 'High', completed: false },
        { id: '2', title: 'Finish project report', dueDate: '2023-10-12', priority: 'Medium', completed: false },
        { id: '3', title: 'Call Alice', dueDate: '2023-10-09', priority: 'Low', completed: true },
    ];

    const [tasks, setTasks] = useState(initialTasks);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDueDate, setNewTaskDueDate] = useState('');
    const [newTaskPriority, setNewTaskPriority] = useState('Medium');
    const [filter, setFilter] = useState('All');

    // Handle drag end
    const onDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedTasks = Array.from(tasks);
        const [removed] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, removed);
        setTasks(reorderedTasks);
    };

    // Add new task
    const handleAddTask = () => {
        if (newTaskTitle.trim() && newTaskDueDate) {
            const newTask = {
                id: Date.now().toString(),
                title: newTaskTitle,
                dueDate: newTaskDueDate,
                priority: newTaskPriority,
                completed: false,
            };
            setTasks([...tasks, newTask]);
            setNewTaskTitle('');
            setNewTaskDueDate('');
            setNewTaskPriority('Medium');
        }
    };

    // Toggle task completion
    const handleToggleComplete = (taskId) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    // Filter tasks based on selected filter
    const filteredTasks = tasks.filter(task => {
        const todayStr = new Date().toISOString().slice(0, 10);
        if (filter === 'Today') return task.dueDate === todayStr;
        if (filter === 'Upcoming') {
            const dueDate = new Date(task.dueDate);
            const today = new Date(todayStr);
            return dueDate > today;
        }
        if (filter === 'Completed') return task.completed;
        return true; // All
    });

    // Priority color mapping
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'error';
            case 'Medium': return 'warning';
            case 'Low': return 'success';
            default: return 'default';
        }
    };

    return (
        <Box p={3}>
            {/* Header */}
            <Typography variant="h4" gutterBottom>Tasks</Typography>

            {/* Filter options */}
            <FormControl sx={{ minWidth: 150, mb: 2 }}>
                <InputLabel>Filter</InputLabel>
                <Select value={filter} label="Filter" onChange={(e) => setFilter(e.target.value)}>
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Today">Today</MenuItem>
                    <MenuItem value="Upcoming">Upcoming</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                </Select>
            </FormControl>

            {/* Drag and Drop List */}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="tasks">
                    {(provided) => (
                        <Box {...provided.droppableProps} ref={provided.innerRef}>
                            {filteredTasks.map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                    {(provided, snapshot) => (
                                        <Card
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            sx={{
                                                mb: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                backgroundColor: snapshot.isDragging ? '#f0f0f0' : '#fff',
                                            }}
                                        >
                                            {/* Drag handle */}
                                            <Box {...provided.dragHandleProps} sx={{ p: 1, cursor: 'grab' }}>&#9776;</Box>
                                            {/* Checkbox */}
                                            <Checkbox
                                                checked={task.completed}
                                                onChange={() => handleToggleComplete(task.id)}
                                                sx={{ ml: 1 }}
                                            />
                                            {/* Task info */}
                                            <CardContent sx={{ flex: 1, p: 2 }}>
                                                <Typography variant="h6">{task.title}</Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Due: {task.dueDate}
                                                </Typography>
                                            </CardContent>
                                            {/* Priority Badge */}
                                            <Chip
                                                label={task.priority}
                                                color={getPriorityColor(task.priority)}
                                                sx={{ m: 1 }}
                                            />
                                        </Card>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Box>
                    )}
                </Droppable>
            </DragDropContext>

            {/* Add new task */}
            <Box mt={4} display="flex" flexDirection="column" gap={2} maxWidth={600}>
                <TextField
                    label="Task Title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <TextField
                    label="Due Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={newTaskDueDate}
                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                />
                <FormControl>
                    <InputLabel>Priority</InputLabel>
                    <Select
                        value={newTaskPriority}
                        onChange={(e) => setNewTaskPriority(e.target.value)}
                        label="Priority"
                    >
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" onClick={handleAddTask}>Add Task</Button>
            </Box>
        </Box>
    );
}

export default To_do;