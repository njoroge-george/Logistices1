import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const cardData = [
    { title: 'Total Balance', value: '$32,560' },
    { title: 'Income', value: '$10,200' },
    { title: 'Expenses', value: '$4,500' },
    { title: 'Savings', value: '$22,600' },
    { title: 'Savings', value: '$22,600' },
    { title: 'Savings', value: '$22,600' },
    { title: 'Savings', value: '$22,600' },
    { title: 'Savings', value: '$22,600' },
    { title: 'Savings', value: '$22,600' },
    { title: 'Savings', value: '$22,600' }
];

export default function Dashboard() {
    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Balance History',
            data: [12000, 18000, 16000, 19000, 24000, 32560],
            borderColor: '#0984e3',
            backgroundColor: 'rgba(9,132,227,0.2)',
            fill: true,
            tension: 0.4
        }]
    };

    const barData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Income',
                backgroundColor: '#00b894',
                data: [3000, 4000, 5000, 4500, 4800, 5200]
            },
            {
                label: 'Expenses',
                backgroundColor: '#d63031',
                data: [2000, 2200, 2500, 2100, 2300, 2600]
            }
        ]
    };

    const pieData = {
        labels: ['Rent', 'Food', 'Transport'],
        datasets: [{
            data: [1200, 800, 500],
            backgroundColor: ['#6c5ce7', '#00cec9', '#fdcb6e']
        }]
    };

    return (
        <Box p={2}>
            <Grid container spacing={2}>
                {cardData.map((card, i) => (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="subtitle2">{card.title}</Typography>
                            <Typography variant="h6">{card.value}</Typography>
                        </Paper>
                    </Grid>
                ))}

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="subtitle1">Balance History</Typography>
                        <Line data={lineData} />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="subtitle1">Income vs Expenses</Typography>
                        <Bar data={barData} />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="subtitle1">Expense Categories</Typography>
                        <Pie data={pieData} />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
