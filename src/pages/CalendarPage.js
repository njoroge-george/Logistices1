import React, { useState } from 'react';
import { Box, Typography, Button, Modal, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { format } from 'date-fns';
import "react-big-calendar/lib/css/react-big-calendar.css";

// Localizer for react-big-calendar
const localizer = momentLocalizer(moment);

function CalendarPage() {
    const [view, setView] = useState('month'); // day, week, month
    const [events, setEvents] = useState([
        { id: 1, title: 'Meeting with Team', start: new Date(), end: new Date(new Date().getTime() + 60 * 60 * 1000), color: '#1976d2' },
        { id: 2, title: 'Doctor Appointment', start: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), end: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000), color: '#d32f2f' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEventTitle, setNewEventTitle] = useState('');
    const [newEventDate, setNewEventDate] = useState('');
    const [newEventTime, setNewEventTime] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventColor, setEventColor] = useState('#1976d2');

    // Handle view toggle
    const handleViewChange = (newView) => {
        setView(newView);
    };

    // Open modal to add event
    const handleQuickAdd = () => {
        setNewEventTitle('');
        setNewEventDate('');
        setNewEventTime('');
        setEventColor('#1976d2');
        setIsModalOpen(true);
    };

    // Save new event
    const handleSaveEvent = () => {
        if (newEventTitle && newEventDate && newEventTime) {
            const start = new Date(`${newEventDate}T${newEventTime}`);
            const end = new Date(start.getTime() + 30 * 60 * 1000); // 30 mins duration
            const newEvent = {
                id: Date.now(),
                title: newEventTitle,
                start,
                end,
                color: eventColor,
            };
            setEvents([...events, newEvent]);
            setIsModalOpen(false);
        }
    };

    // Render events with custom styling
    const eventStyleGetter = (event) => {
        const backgroundColor = event.color || '#3174ad';
        return {
            style: {
                backgroundColor,
                borderRadius: '4px',
                opacity: 0.8,
                color: 'white',
                border: '0px',
                display: 'block',
            },
        };
    };

    // Event click handler
    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
    };

    // Edit event details
    const handleEditEvent = () => {
        if (selectedEvent) {
            setNewEventTitle(selectedEvent.title);
            setNewEventDate(format(selectedEvent.start, 'yyyy-MM-dd'));
            setNewEventTime(format(selectedEvent.start, 'HH:mm'));
            setEventColor(selectedEvent.color);
            setIsModalOpen(true);
        }
    };

    // Save edited event
    const handleUpdateEvent = () => {
        if (selectedEvent && newEventTitle && newEventDate && newEventTime) {
            const start = new Date(`${newEventDate}T${newEventTime}`);
            const end = new Date(start.getTime() + 30 * 60 * 1000);
            setEvents(prev =>
                prev.map(evt => (evt.id === selectedEvent.id ? { ...evt, title: newEventTitle, start, end, color: eventColor } : evt))
            );
            setSelectedEvent(null);
            setIsModalOpen(false);
        }
    };

    // Delete event
    const handleDeleteEvent = () => {
        if (selectedEvent) {
            setEvents(prev => prev.filter(evt => evt.id !== selectedEvent.id));
            setSelectedEvent(null);
        }
    };

    return (
        <Box p={3}>
            {/* Header */}
            <Typography variant="h4" gutterBottom>Calendar</Typography>

            {/* View toggle buttons */}
            <Box mb={2}>
                <Button variant={view === 'day' ? 'contained' : 'outlined'} onClick={() => handleViewChange('day')}>Day</Button>
                <Button variant={view === 'week' ? 'contained' : 'outlined'} onClick={() => handleViewChange('week')} sx={{ ml: 1 }}>Week</Button>
                <Button variant={view === 'month' ? 'contained' : 'outlined'} onClick={() => handleViewChange('month')} sx={{ ml: 1 }}>Month</Button>
            </Box>

            {/* Calendar */}
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                view={view}
                onSelectEvent={handleSelectEvent}
                eventPropGetter={eventStyleGetter}
            />

            {/* Quick add event button */}
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleQuickAdd}>Quick Add Event</Button>

            {/* Event details/edit modal */}
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" gutterBottom>{selectedEvent ? 'Edit Event' : 'Add Event'}</Typography>
                    <TextField
                        label="Title"
                        fullWidth
                        value={newEventTitle}
                        onChange={(e) => setNewEventTitle(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Date"
                        type="date"
                        fullWidth
                        value={newEventDate}
                        onChange={(e) => setNewEventDate(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Time"
                        type="time"
                        fullWidth
                        value={newEventTime}
                        onChange={(e) => setNewEventTime(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Color</InputLabel>
                        <Select
                            value={eventColor}
                            onChange={(e) => setEventColor(e.target.value)}
                        >
                            <MenuItem value="#1976d2">Blue</MenuItem>
                            <MenuItem value="#d32f2f">Red</MenuItem>
                            <MenuItem value="#388e3c">Green</MenuItem>
                            <MenuItem value="#fbc02d">Yellow</MenuItem>
                        </Select>
                    </FormControl>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        {selectedEvent && (
                            <Button color="error" variant="outlined" onClick={handleDeleteEvent}>Delete</Button>
                        )}
                        <Button variant="contained" onClick={selectedEvent ? handleUpdateEvent : handleSaveEvent}>
                            {selectedEvent ? 'Update' : 'Add'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

export default CalendarPage;