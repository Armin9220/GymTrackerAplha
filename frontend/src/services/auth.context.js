// services/auth.context.js
import { createContext } from 'react';

const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

export default AuthContext;
