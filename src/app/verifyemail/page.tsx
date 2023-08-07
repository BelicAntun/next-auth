'use client';

import axios from 'axios';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

export default function VerifyEmailPage() {
  const [token, setToken] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  const verifyEmail = useCallback(() => {
    async () => {
      try {
        await axios.post('/api/users/verifyemail', { token });
        setIsVerified(true);
      } catch (error: any) {
        setError(error.response.data.message);
      }
    };
  }, [token]);

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token, verifyEmail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Verify Email</h1>
      {isVerified ? (
        <div>
          <h1>Your email is verified</h1>
          <Link href="/login">Login</Link>
        </div>
      ) : (
        <div>
          <h1>{error}</h1>
        </div>
      )}
    </div>
  );
}
