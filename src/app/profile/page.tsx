'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { sendEmail } from '@/helpers/mailer';

export default function ProfilePage() {
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
    _id: '',
  });
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const changePassword = async () => {
    try {
      await axios.post('/api/users/forgotpassword', { email: user.email, emailType: 'RESET', userId: user._id });
      toast.success('Email sent');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const getUser = async () => {
    const res = await axios.get('/api/users/me');

    setUser(res.data.user);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1>{user.username.length > 0 && user.username}</h1>
      <button
        className="p-2 mt-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-500 bg-blue-500"
        onClick={logout}
      >
        Logout
      </button>
      {user._id.length > 0 && (
        <button
          className="p-2 mt-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-500 bg-blue-500"
          onClick={changePassword}
        >
          Forgot Your Password?
        </button>
      )}
    </div>
  );
}
