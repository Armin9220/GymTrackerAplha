import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
} from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    roles: {
      user: true,
      admin: false,
    },
  });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setFormData({
      ...formData,
      roles: {
        ...formData.roles,
        [e.target.name]: e.target.checked,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rolesArray = Object.keys(formData.roles).filter((r) => formData.roles[r]);

    try {
      await AuthService.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        roles: rolesArray,
      });
      setSuccessMsg('✅ Registrierung erfolgreich!');
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('❌ Fehler bei der Registrierung (evtl. existiert Nutzer schon)');
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
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#64ffda' }}>
          <HowToRegIcon />
        </Avatar>
        <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
          Registrieren
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Benutzername"
                name="username"
                value={formData.username}
                onChange={handleChange}
                InputProps={{ style: { backgroundColor: '#f5f5f5', borderRadius: 8 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="E-Mail"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                InputProps={{ style: { backgroundColor: '#f5f5f5', borderRadius: 8 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Passwort"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{ style: { backgroundColor: '#f5f5f5', borderRadius: 8 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend" sx={{ color: '#bbb' }}>Rollen</FormLabel>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.roles.user}
                        onChange={handleRoleChange}
                        name="user"
                        sx={{ color: '#64ffda' }}
                      />
                    }
                    label="User"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.roles.admin}
                        onChange={handleRoleChange}
                        name="admin"
                        sx={{ color: '#64ffda' }}
                      />
                    }
                    label="Admin"
                  />
                </FormGroup>
              </FormControl>
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}

            {successMsg && (
              <Grid item xs={12}>
                <Typography color="success.main">{successMsg}</Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
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
                Registrieren
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
