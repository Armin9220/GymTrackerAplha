import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './modules/Navigation';
import AdminDashboard from './modules/AdminDashboard';
import UserDashboard from './modules/UserDashboard';
import Login from './modules/Login';
import NoPage from './modules/NoPage';
import RequireAuth from './modules/RequireAuth';
import AuthContext from './services/auth.context';
import { ThemeProvider } from '@mui/material/styles';
import Home from './modules/Home';
import Signup from './modules/SignUp';

import theme from './theme';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={{ user, setUser }}>
        <Navigation />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={
            <RequireAuth role="ROLE_ADMIN">
              <AdminDashboard />
            </RequireAuth>
          } />
          <Route path="/user/*" element={
            <RequireAuth role="ROLE_USER">
              <UserDashboard />
            </RequireAuth>
          } />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}
