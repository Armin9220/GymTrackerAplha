import React, { useContext } from 'react';
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../services/auth.context';

export default function Navigation() {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const getTabsForRole = () => {
    if (!user) return [];

    if (user.roles.includes('ROLE_ADMIN')) {
      return [
        { label: '🧑‍💼 Mitgliederverwaltung', path: '/admin/members' },
        { label: '📋 Trainingspläne verwalten', path: '/admin/plans' },
        { label: '📊 Statistiken', path: '/admin/stats' },
        { label: '🔒 Admin-Bereich', path: '/admin/secure' },
      ];
    }

    if (user.roles.includes('ROLE_USER')) {
      return [
        { label: '🏋️ Mein Trainingsplan', path: '/user/plan' },
        { label: '📈 Mein Fortschritt', path: '/user/progress' },
        { label: '⚙️ Einstellungen', path: '/user/settings' },
      ];
    }

    return [];
  };

  const currentTab = getTabsForRole().findIndex(tab => location.pathname.startsWith(tab.path));

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          GymTracker
        </Typography>
        <Tabs value={currentTab} textColor="inherit" indicatorColor="secondary">
          {getTabsForRole().map(tab => (
            <Tab
              key={tab.path}
              label={tab.label}
              component={Link}
              to={tab.path}
              sx={{ fontWeight: 'bold', textTransform: 'none' }}
            />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}
