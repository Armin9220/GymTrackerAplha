import React, { useState, useEffect, useContext } from 'react';
import {
  Box, Tabs, Tab, Typography, Button, TextField, MenuItem,
  Select, InputLabel, FormControl, Paper
} from '@mui/material';
import AuthContext from '../services/auth.context';
import authService from '../services/auth.service';
import axios from 'axios';

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [tabIndex, setTabIndex] = useState(0);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [exercises, setExercises] = useState('');
  const [stats, setStats] = useState({});
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  useEffect(() => {
    if (user) {
      fetchUsers();
      fetchStats();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/admin/users', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/admin/stats', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createPlan = async () => {
    try {
      await axios.post(`http://localhost:8080/api/plans/${selectedUser}`, {
        exercises: exercises.split(',').map(e => ({ name: e.trim(), completed: false }))
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert('Trainingsplan gespeichert!');
    } catch (err) {
      console.error(err);
    }
  };

  const createUser = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/signup', {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        roles: [newUser.role]
      });
      alert('Neuer Nutzer erstellt!');
      setNewUser({ username: '', email: '', password: '', role: 'user' });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (_, newValue) => setTabIndex(newValue);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#e9ecef',
        p: 4,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: '1000px', margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#2c3e50' }}>
          Admin Dashboard
        </Typography>

        <Tabs
          value={tabIndex}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{ borderBottom: '1px solid #ccc' }}
        >
          <Tab label="🧑‍💼 Mitgliederverwaltung" />
          <Tab label="📋 Trainingspläne verwalten" />
          <Tab label="📊 Statistiken" />
          <Tab label="🔒 Admin-Bereich" />
        </Tabs>

        {/* Tab 1 */}
        {tabIndex === 0 && (
          <Box mt={4}>
            <Typography variant="h6" sx={{ color: '#34495e' }}>Alle Mitglieder</Typography>
            <ul>
              {users.map(u => (
                <li key={u.id}>{u.username} – {u.email} – {u.roles.join(', ')}</li>
              ))}
            </ul>
          </Box>
        )}

        {/* Tab 2 */}
        {tabIndex === 1 && (
          <Box mt={4}>
            <Typography variant="h6" sx={{ color: '#34495e' }}>Trainingsplan erstellen</Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Benutzer wählen</InputLabel>
              <Select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                label="Benutzer wählen"
              >
                {users.map(u => (
                  <MenuItem key={u.id} value={u.id}>{u.username}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Übungen (kommagetrennt z.B. Bankdrücken, Kniebeugen)"
              value={exercises}
              onChange={(e) => setExercises(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={createPlan}>Plan speichern</Button>
          </Box>
        )}

        {/* Tab 3 */}
        {tabIndex === 2 && (
          <Box mt={4}>
            <Typography variant="h6" sx={{ color: '#34495e' }}>📊 Statistiken</Typography>
            <ul>
              <li>Aktive Nutzer: {stats.users}</li>
              <li>Erstellte Pläne: {stats.plans}</li>
              {/* Mehr Daten falls gewünscht */}
            </ul>
          </Box>
        )}

        {/* Tab 4 */}
        {tabIndex === 3 && (
          <Box mt={4}>
            <Typography variant="h6" sx={{ color: '#34495e' }}>🔒 Neuer Benutzer</Typography>
            <TextField
              fullWidth label="Benutzername"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth label="E-Mail"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth label="Passwort"
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Rolle</InputLabel>
              <Select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                label="Rolle"
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" onClick={createUser}>Benutzer erstellen</Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
