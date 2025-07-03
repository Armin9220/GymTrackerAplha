import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthService from '../services/auth.service';

export default function UserDashboard() {
  const [plan, setPlan] = useState([]);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const headers = AuthService.getJwtHeader();
        const user = AuthService.getCurrentUser();
        const res = await axios.get(`http://localhost:8080/api/plans/${user.id}`, headers);
        setPlan(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlan();
  }, []);

  const toggleComplete = (index) => {
    const newPlan = [...plan];
    newPlan[index].done = !newPlan[index].done;
    setPlan(newPlan);
    // optional: Save to server
  };

  return (
    <div>
      <h2>Mein Trainingsplan</h2>
      <ul>
        {plan.map((exercise, idx) => (
          <li key={idx}>
            <input type="checkbox" checked={exercise.done} onChange={() => toggleComplete(idx)} />
            {exercise.name} – {exercise.reps}
          </li>
        ))}
      </ul>
    </div>
  );
}
