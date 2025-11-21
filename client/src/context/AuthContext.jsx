// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch current user on load
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/auth/me', {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function loginWithGoogle(idToken) {
    const res = await axios.post(
      'http://localhost:4000/api/auth/login',
      { idToken },
      { withCredentials: true }
    );
    setUser(res.data.user);
  }

  async function logout() {
    await axios.post(
      'http://localhost:4000/api/auth/logout',
      {},
      { withCredentials: true }
    );
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
