import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

export default function RequireAuth({ children, role }) {
  const user = AuthService.getCurrentUser();

  if (!user) return <Navigate to="/login" />;
  if (role && !user.roles.includes(role)) return <Navigate to="/" />;

  return children;
}
