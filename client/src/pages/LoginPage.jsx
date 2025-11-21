// src/pages/LoginPage.jsx
import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const buttonRef = useRef(null);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (window.google && buttonRef.current) {
      // eslint-disable-next-line no-undef
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async (response) => {
          const idToken = response.credential;
          await loginWithGoogle(idToken);
        },
      });
      // eslint-disable-next-line no-undef
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
      });
    }
  }, [loginWithGoogle]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Hello Contacts</h1>
        <p className="mb-6 text-slate-600">
          Sign in with Google to manage your contacts.
        </p>
        <div ref={buttonRef} className="flex justify-center" />
      </div>
    </div>
  );
}
