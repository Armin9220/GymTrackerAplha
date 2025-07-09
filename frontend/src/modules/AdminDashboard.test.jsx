import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminDashboard from './AdminDashboard';
import AuthContext from '../services/auth.context';
import axios from 'axios';

// 👇 Axios-Mock für API-Calls
jest.mock('axios');

const mockUser = {
  token: 'fake-token',
  roles: ['ROLE_ADMIN'],
};

describe('AdminDashboard Tests', () => {

  test('Tabs werden korrekt angezeigt', () => {
    render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <AdminDashboard />
      </AuthContext.Provider>
    );

    expect(screen.getByText('🧑‍💼 Mitgliederverwaltung')).toBeInTheDocument();
    expect(screen.getByText('📋 Trainingspläne verwalten')).toBeInTheDocument();
    expect(screen.getByText('📊 Statistiken')).toBeInTheDocument();
    expect(screen.getByText('🔒 Admin-Bereich')).toBeInTheDocument();
  });

  test('Mitglieder werden korrekt geladen und angezeigt', async () => {
    const mockedUsers = [
      { id: 1, username: 'Ahmad', email: 'ahmad@example.com', roles: ['user'] },
      { id: 2, username: 'Layla', email: 'layla@example.com', roles: ['admin'] }
    ];

    axios.get.mockImplementation((url) => {
      if (url.includes('/users')) {
        return Promise.resolve({ data: mockedUsers });
      }
      if (url.includes('/stats')) {
        return Promise.resolve({ data: { users: 2, plans: 3 } });
      }
    });

    render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <AdminDashboard />
      </AuthContext.Provider>
    );

    // Warte bis der erste Nutzer sichtbar ist
    await waitFor(() => {
      expect(screen.getByText(/Ahmad/i)).toBeInTheDocument();
      expect(screen.getByText(/Layla/i)).toBeInTheDocument();
    });
  });
});
