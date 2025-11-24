import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const { setUser } = useAuth();

  async function handleSuccess(credentialResponse) {
    try {
      const idToken = credentialResponse.credential;
      const res = await axios.post('/auth/login', { idToken });
      setUser(res.data.user); // this will cause App to re-render to Dashboard
    } catch (err) {
      console.error(err);
      alert('Login failed on server');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Admin Login
        </h1>
        <p className="mb-6 text-center text-sm text-slate-600">
          Sign in with your Google account to manage contacts.
        </p>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => alert('Google login failed')}
          />
        </div>
      </div>
    </div>
  );
}
