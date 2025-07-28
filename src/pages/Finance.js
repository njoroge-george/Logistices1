import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Select, MenuItem, InputLabel, FormControl, List, ListItem, ListItemText } from '@mui/material';

export default function Finance() {
    const [entries, setEntries] = useState([]);
    const [type, setType] = useState('income'); // 'income' or 'expense'
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const handleAddEntry = () => {
        if (amount && category) {
            const newEntry = {
                id: Date.now(),
                type,
                amount: parseFloat(amount),
                category,
                description,
                date: new Date().toLocaleString(),
            };
            setEntries([...entries, newEntry]);
            // Reset form
            setAmount('');
            setCategory('');
            setDescription('');
        }
    };

    return (
        <Box p={2}>
            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h4" gutterBottom>Finance Overview</Typography>
                <Typography mb={2}>
                    Manage your income and expenses. Add new entries below.
                </Typography>
                {/* Form to add new entry */}
                <Box display="flex" flexDirection="column" gap={2} mb={4}>
                    <FormControl fullWidth>
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                            labelId="type-label"
                            value={type}
                            label="Type"
                            onChange={(e) => setType(e.target.value)}
                        >
                            <MenuItem value="income">Income</MenuItem>
                            <MenuItem value="expense">Expense</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                    />
                    <Button variant="contained" color="primary" onClick={handleAddEntry}>
                        Add Entry
                    </Button>
                </Box>
            </Paper>

            {/* List of entries */}
            <Typography variant="h5" gutterBottom>Entries</Typography>
            <List>
                {entries.length === 0 ? (
                    <Typography>No entries yet.</Typography>
                ) : (
                    entries.map((entry) => (
                        <ListItem key={entry.id} sx={{ border: '1px solid #ccc', mb: 1, borderRadius: 1, p: 1 }}>
                            <ListItemText
                                primary={`${entry.type.toUpperCase()}: $${entry.amount} - ${entry.category}`}
                                secondary={`${entry.description} | ${entry.date}`}
                            />
                        </ListItem>
                    ))
                )}
            </List>
        </Box>
    );
}