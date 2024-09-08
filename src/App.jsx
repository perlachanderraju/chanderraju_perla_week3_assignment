import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, TextField, Button, Paper } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import './App.css'
function App() {
  const [activities, setActivities] = useState([]);
  const [steps, setSteps] = useState('');
  const [calories, setCalories] = useState('');
  const [workoutTime, setWorkoutTime] = useState('');

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (steps && calories && workoutTime) {
      const newActivity = {
        steps: parseInt(steps),
        calories: parseInt(calories),
        workoutTime: parseInt(workoutTime),
        date: new Date().toLocaleDateString(),
      };
      setActivities([...activities, newActivity]);
      setSteps('');
      setCalories('');
      setWorkoutTime('');
    }
  };

  // Calculate totals (useEffect used as an example)
  const [totalSteps, setTotalSteps] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalWorkoutTime, setTotalWorkoutTime] = useState(0);

  useEffect(() => {
    const totalSteps = activities.reduce((acc, activity) => acc + activity.steps, 0);
    const totalCalories = activities.reduce((acc, activity) => acc + activity.calories, 0);
    const totalWorkoutTime = activities.reduce((acc, activity) => acc + activity.workoutTime, 0);

    setTotalSteps(totalSteps);
    setTotalCalories(totalCalories);
    setTotalWorkoutTime(totalWorkoutTime);
  }, [activities]);

  return (
    <div className='container'>
      <Container maxWidth="md" style={{ marginTop: '2rem' }} >
        <Typography variant="h4" align="center" gutterBottom>
          Fitness Challenge Tracker <FitnessCenterIcon />
        </Typography>

        <Grid container spacing={4}>
          {/* Form Section */}
          <Grid item xs={12} sm={6}>
            <Paper style={{ padding: '1rem' }}>
              <Typography variant="h6" gutterBottom>
                <strong>Log Your Activity</strong>
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Steps Taken"
                  fullWidth
                  margin="normal"
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                />
                <TextField
                  label="Calories Burned"
                  fullWidth
                  margin="normal"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                />
                <TextField
                  label="Workout Time (minutes)"
                  fullWidth
                  margin="normal"
                  value={workoutTime}
                  onChange={(e) => setWorkoutTime(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>
                  Add Activity
                </Button>
              </form>
            </Paper>
          </Grid>

          {/* Dashboard Section */}
          <Grid item xs={12} sm={6}>
            <Paper style={{ padding: '1rem' }}>
              <Typography variant="h6" gutterBottom>
                <strong>Dashboard</strong>
              </Typography>
              <Typography><strong>Total Steps: </strong>{totalSteps}</Typography>
              <Typography><strong>Total Calories Burned: </strong>{totalCalories}</Typography>
              <Typography><strong>Total Workout Time: </strong>{totalWorkoutTime} minutes</Typography>

              <Typography variant="h6" style={{ marginTop: '1rem' }} >
                <strong>Activity History</strong>
              </Typography>
              {activities.length === 0 ? (
                <Typography>No activities logged yet.</Typography>
              ) : (
                activities.map((activity, index) => (
                  <Typography key={index}>
                    {activity.date}: {activity.steps} steps, {activity.calories} calories, {activity.workoutTime} min
                  </Typography>
                ))
              )}
            </Paper>
          </Grid>
        </Grid>
    </Container>

    </div>
    
  );
}

export default App;
