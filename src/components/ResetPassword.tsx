'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState, type FC } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';

const ResetPassword: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!token) {
        toast.error('Invalid or missing token');
        return;
      }

      const { error } = await authClient.resetPassword({
        token,
        newPassword: password,
      });

      if (error) {
        toast.error(error.message || 'Failed to reset password');
      } else {
        toast.success('Password updated successfully');
        router.push('/auth/sign-in');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <Card className="w-full max-w-md p-6 flex flex-col justify-center h-[500px]">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter your new password below to update your account password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleReset}>
            <Input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Password'}
            </Button>
          </form>
        </CardContent>

        <CardFooter>
          <Toaster position="top-right" reverseOrder={false} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPassword;
