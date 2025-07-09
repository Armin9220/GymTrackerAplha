// modules/Home.jsx
import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
        color: '#ffffff',
        textAlign: 'center',
        p: 4,
      }}
    >
      <FitnessCenterIcon sx={{ fontSize: 80, mb: 2, color: '#00e676' }} />
      <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
        Willkommen bei GymTracker
      </Typography>
      <Typography variant="h6" sx={{ maxWidth: 600, mb: 5 }}>
        Behalte deine Trainingsfortschritte im Blick – egal ob Anfänger, Fortgeschrittener oder Admin 💪
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: '#00e676',
            color: '#000',
            '&:hover': {
              backgroundColor: '#00c853',
            },
          }}
          startIcon={<LoginIcon />}
          onClick={() => navigate('/login')}
        >
          Login
        </Button>

        <Button
          variant="outlined"
          size="large"
          sx={{
            borderColor: '#00e676',
            color: '#00e676',
            '&:hover': {
              backgroundColor: 'rgba(0, 230, 118, 0.1)',
              borderColor: '#00c853',
              color: '#00c853',
            },
          }}
          startIcon={<PersonAddAltIcon />}
          onClick={() => navigate('/signup')}
        >
          Registrieren
        </Button>
      </Stack>
    </Box>
  );
}
