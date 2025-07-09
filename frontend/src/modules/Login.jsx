import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Avatar,
  Paper,
  CssBaseline,
  Grid,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../services/auth.context';
import AuthService from '../services/auth.service';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.login(username, password);
      setUser(response);
      if (response.roles.includes('ROLE_ADMIN')) {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (err) {
      setError('❌ Benutzername oder Passwort ist ungültig');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper
        elevation={10}
        sx={{
          marginTop: 8,
          padding: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 4,
          background: 'linear-gradient(135deg, #1e1e2f, #2d2d44)',
          color: '#ffffff',
          boxShadow: '0 0 15px rgba(100,255,218,0.2)',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#64ffda' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
          Willkommen zurück 💪
        </Typography>
        <Typography variant="body1" color="gray" gutterBottom>
          Bitte melde dich an, um fortzufahren
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 2, width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Benutzername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  style: {
                    borderRadius: 8,
                    backgroundColor: '#f5f5f5',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Passwort"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  style: {
                    borderRadius: 8,
                    backgroundColor: '#f5f5f5',
                  },
                }}
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography color="error" fontWeight="bold">
                  {error}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: '#64ffda',
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  padding: '0.8rem',
                  borderRadius: 3,
                  '&:hover': {
                    backgroundColor: '#1de9b6',
                  },
                }}
              >
                Einloggen
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
