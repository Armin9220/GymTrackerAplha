import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import {
  TextField,
  Button,
  Container,
  Typography
} from '@mui/material';

export default function Login() {
  const [entries, setEntries] = useState({ username: '', password: '' });
  const redirect = useNavigate();

  const handleChange = (e) => {
    setEntries({ ...entries, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await AuthService.login(entries.username, entries.password);
      const roles = res.roles;
      if (roles.includes("ROLE_ADMIN")) {
        redirect("/admin");
      } else {
        redirect("/user");
      }
    } catch (err) {
      alert("Login fehlgeschlagen!");
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth margin="normal" required
          label="Username"
          name="username"
          value={entries.username}
          onChange={handleChange}
        />
        <TextField
          fullWidth margin="normal" required
          label="Password"
          name="password"
          type="password"
          value={entries.password}
          onChange={handleChange}
        />
        <Button fullWidth variant="contained" type="submit">Login</Button>
      </form>
    </Container>
  );
}
