import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Grid,
    IconButton,
    Chip,
    useTheme,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';
import { Edit, Delete, Save, Cancel, StarBorder, Star } from '@mui/icons-material';
import { getNotes, addNote, updateNote, deleteNote } from '../api/notesApi';
import { motion } from 'framer-motion';

export default function Journal() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [newTag, setNewTag] = useState('idea');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const theme = useTheme();

    const loadNotes = async () => {
        const res = await getNotes();
        setNotes(res.data);
    };

    useEffect(() => {
        loadNotes();
    }, []);

    const handleAddNote = async () => {
        if (!newNote.trim()) return;
        await addNote({ text: newNote, date: new Date().toISOString(), tags: newTag, pinned: false });
        setNewNote('');
        loadNotes();
    };

    const handleDelete = async (id) => {
        await deleteNote(id);
        loadNotes();
    };

    const handleSaveEdit = async (id) => {
        await updateNote(id, { text: editText, date: new Date().toISOString() });
        setEditingId(null);
        setEditText('');
        loadNotes();
    };

    const handleTogglePin = async (id, currentPinned) => {
        await updateNote(id, { pinned: !currentPinned });
        loadNotes();
    };

    const exportNotes = () => {
        const blob = new Blob([JSON.stringify(notes, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'notes.json';
        a.click();
    };

    const filteredNotes = notes.filter(note =>
        note.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pinnedNotes = filteredNotes.filter(note => note.pinned);
    const otherNotes = filteredNotes.filter(note => !note.pinned);

    const renderNotes = (noteList) => (
        <Grid container spacing={2}>
            {noteList.map((note) => (
                <Grid item xs={12} md={6} lg={4} key={note.id}>
                    {/*<motion.div*/}
                    {/*    initial={{ opacity: 0, y: 20 }}*/}
                    {/*    animate={{ opacity: 1, y: 0 }}*/}
                    {/*    exit={{ opacity: 0, y: -20 }}*/}
                    {/*>*/}
                    {/*    <Paper*/}
                    {/*        sx={{*/}
                    {/*            p: 2,*/}
                    {/*            position: 'relative',*/}
                    {/*            borderLeft: '5px solid #1976d2',*/}
                    {/*            backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#f9f9f9',*/}
                    {/*            boxShadow: 3,*/}
                    {/*            borderRadius: 2*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        <Typography variant="body2" color="text.secondary">*/}
                    {/*            {new Date(note.date).toLocaleString()}*/}
                    {/*        </Typography>*/}
                    {/*        {note.tags && (*/}
                    {/*            <Chip label={`#${note.tags}`} color="primary" variant="outlined" size="small" sx={{ my: 1 }} />*/}
                    {/*        )}*/}

                    {/*        {editingId === note.id ? (*/}
                    {/*            <>*/}
                    {/*                <TextField*/}
                    {/*                    fullWidth*/}
                    {/*                    multiline*/}
                    {/*                    value={editText}*/}
                    {/*                    onChange={(e) => setEditText(e.target.value)}*/}
                    {/*                    sx={{ my: 1 }}*/}
                    {/*                />*/}
                    {/*                <IconButton onClick={() => handleSaveEdit(note.id)}><Save /></IconButton>*/}
                    {/*                <IconButton onClick={() => setEditingId(null)}><Cancel /></IconButton>*/}
                    {/*            </>*/}
                    {/*        ) : (*/}
                    {/*            <>*/}
                    {/*                <Typography sx={{ my: 1 }}>{note.text}</Typography>*/}
                    {/*                <IconButton onClick={() => { setEditingId(note.id); setEditText(note.text); }}><Edit /></IconButton>*/}
                    {/*                <IconButton onClick={() => handleDelete(note.id)}><Delete /></IconButton>*/}
                    {/*                <IconButton onClick={() => handleTogglePin(note.id, note.pinned)}>*/}
                    {/*                    {note.pinned ? <Star /> : <StarBorder />}*/}
                    {/*                </IconButton>*/}
                    {/*            </>*/}
                    {/*        )}*/}
                    {/*    </Paper>*/}
                    {/*</motion.div>*/}
                </Grid>
            ))}
        </Grid>
    );

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Notes
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                You have {notes.length} notes
            </Typography>

            <TextField
                placeholder="Search notes..."
                fullWidth
                variant="outlined"
                size="small"
                sx={{ mb: 3 }}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Paper sx={{ p: 2, mb: 4 }}>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="New Note"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                />
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="tag-label">Tag</InputLabel>
                    <Select
                        labelId="tag-label"
                        value={newTag}
                        label="Tag"
                        onChange={(e) => setNewTag(e.target.value)}
                    >
                        <MenuItem value="idea">Idea</MenuItem>
                        <MenuItem value="task">Task</MenuItem>
                        <MenuItem value="urgent">Urgent</MenuItem>
                        <MenuItem value="personal">Personal</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" sx={{ mt: 2, mr: 2 }} onClick={handleAddNote}>
                    Add Note
                </Button>
                <Button variant="outlined" sx={{ mt: 2 }} onClick={exportNotes}>
                    Export Notes
                </Button>
            </Paper>

            {pinnedNotes.length > 0 && (
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" color="primary">Pinned Notes</Typography>
                    {renderNotes(pinnedNotes)}
                </Box>
            )}

            <Typography variant="h6">Other Notes</Typography>
            {renderNotes(otherNotes)}
        </Box>
    );
}
