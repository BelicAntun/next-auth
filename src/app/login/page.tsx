'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/users/login', user);
      console.log('login success', res.data);
      toast.success('Login success');
      router.push('/profile');
    } catch (error: any) {
      console.log('login fail', error.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? 'Logging...' : 'Login'}</h1>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Your Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-500 text-black"
      />
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

      <button
        onClick={onLogin}
        className={`px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 ${
          isDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isDisabled}
      >
        Log in
      </button>

      <Link href="/signup"> Sign up </Link>
    </div>
  );
}
