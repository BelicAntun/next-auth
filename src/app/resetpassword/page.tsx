'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [user, setUser] = useState({
    password: '',
    confirmPassword: '',
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const changePassword = async () => {
    try {
      const res = await axios.post('/api/users/resetpassword', { token: token, password: user.password });
      toast.success('Password reset success');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (user.password.length > 0 && user.password === user.confirmPassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? 'Logging...' : 'Login'}</h1>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Your Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-500 text-black"
      />
      <label htmlFor="confirmPassword">Password</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm Your Password"
        value={user.confirmPassword}
        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
        className="p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-500 text-black"
      />

      <button
        onClick={changePassword}
        className={`px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 ${
          isDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isDisabled}
      >
        Change Password
      </button>
    </div>
  );
}
