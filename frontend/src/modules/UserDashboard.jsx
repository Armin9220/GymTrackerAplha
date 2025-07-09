import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Checkbox,
  CircularProgress,
  Snackbar,
  Alert,
  Divider
} from '@mui/material';
import AuthService from '../services/auth.service';
import axios from 'axios';

export default function UserDashboard() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const user = AuthService.getCurrentUser();

  const fetchPlans = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/user/plans', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setPlans(res.data);
    } catch (err) {
      console.error('Fehler beim Laden der Pläne', err);
      setMessage('Fehler beim Laden der Trainingspläne');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = async (planId, exerciseId) => {
    const updatedPlans = plans.map((plan) => {
      if (plan.id === planId) {
        const updatedExercises = plan.exercises.map((ex) =>
          ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
        );
        return { ...plan, exercises: updatedExercises };
      }
      return plan;
    });

    setPlans(updatedPlans);

    try {
      await axios.put(`http://localhost:8080/api/user/plans/${planId}`, updatedPlans.find(p => p.id === planId), {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    } catch (err) {
      console.error('Fehler beim Aktualisieren', err);
      setMessage('Fehler beim Aktualisieren des Plans');
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  if (loading) return <CircularProgress sx={{ m: 5 }} />;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        🏋️ Mein Trainingsplan
      </Typography>
      {plans.length === 0 ? (
        <Typography>Du hast noch keinen Trainingsplan.</Typography>
      ) : (
        plans.map((plan) => (
          <Card key={plan.id} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6">{plan.name}</Typography>
              <Divider sx={{ my: 1 }} />
              {plan.exercises.map((exercise) => (
                <Box
                  key={exercise.id}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ py: 0.5 }}
                >
                  <Typography>{exercise.name}</Typography>
                  <Checkbox
                    checked={exercise.completed || false}
                    onChange={() => handleCheckboxChange(plan.id, exercise.id)}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        ))
      )}
      <Snackbar
        open={!!message}
        autoHideDuration={4000}
        onClose={() => setMessage('')}
      >
        <Alert severity="error" onClose={() => setMessage('')}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
