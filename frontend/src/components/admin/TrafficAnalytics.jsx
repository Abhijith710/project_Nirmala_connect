import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const TrafficAnalytics = () => {
  const [timeframe, setTimeframe] = useState('week');

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  const trafficData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Visitors',
        data: [120, 190, 170, 220, 300, 250, 280],
        fill: false,
        borderColor: '#3f51b5',
        tension: 0.4,
      },
    ],
  };

  const summaryStats = [
    { label: 'Total Visits', value: 1543 },
    { label: 'Active Users', value: 328 },
    { label: 'Bounce Rate', value: '37%' },
  ];

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>Traffic Analytics</Typography>

      <FormControl sx={{ minWidth: 150, mb: 3 }}>
        <InputLabel>Timeframe</InputLabel>
        <Select value={timeframe} label="Timeframe" onChange={handleTimeframeChange}>
          <MenuItem value="day">Today</MenuItem>
          <MenuItem value="week">This Week</MenuItem>
          <MenuItem value="month">This Month</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={2} mb={3}>
        {summaryStats.map((stat) => (
          <Grid item xs={12} md={4} key={stat.label}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2">{stat.label}</Typography>
                <Typography variant="h6">{stat.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="subtitle1" mb={2}>Visitor Trends</Typography>
          <Line data={trafficData} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default TrafficAnalytics;
