import { useEffect, useState } from 'react';
import axios from 'axios';
import AuthService from '../services/auth.service';

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const header = AuthService.getJwtHeader();
        const res = await axios.get("http://localhost:8080/items", header);
        setItems(res.data);
      } catch (err) {
        console.error("Fehler beim Laden:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Öffentlicher Bereich</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
