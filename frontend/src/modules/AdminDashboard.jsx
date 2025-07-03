import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthService from '../services/auth.service';

export default function AdminDashboard() {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ username: '', password: '', email: '' });

  const loadMembers = async () => {
    try {
      const headers = AuthService.getJwtHeader();
      const res = await axios.get("http://localhost:8080/api/members", headers);
      setMembers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const headers = AuthService.getJwtHeader();
      await axios.post("http://localhost:8080/api/auth/signup", {
        ...newMember,
        roles: ['admin'] // oder ['user']
      }, headers);
      setNewMember({ username: '', password: '', email: '' });
      loadMembers();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  return (
    <div>
      <h2>Mitgliederverwaltung</h2>
      <form onSubmit={handleCreate}>
        <input placeholder="Username" value={newMember.username}
               onChange={e => setNewMember({ ...newMember, username: e.target.value })} />
        <input placeholder="Email" value={newMember.email}
               onChange={e => setNewMember({ ...newMember, email: e.target.value })} />
        <input placeholder="Passwort" type="password" value={newMember.password}
               onChange={e => setNewMember({ ...newMember, password: e.target.value })} />
        <button type="submit">Erstellen</button>
      </form>
      <ul>
        {members.map(m => (
          <li key={m.id}>{m.username} – {m.email}</li>
        ))}
      </ul>
    </div>
  );
}
