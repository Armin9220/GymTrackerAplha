import { Routes, Route } from 'react-router-dom';
import Layout from './modules/Layout';
import Home from './modules/Home';
import About from './modules/About';
import Login from './modules/Login';
import AdminDashboard from './modules/AdminDashboard';
import UserDashboard from './modules/UserDashboard';
import NoPage from './modules/NoPage';
import RequireAuth from './modules/RequireAuth';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route
          path="admin"
          element={
            <RequireAuth role="ROLE_ADMIN">
              <AdminDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="user"
          element={
            <RequireAuth role="ROLE_USER">
              <UserDashboard />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}
