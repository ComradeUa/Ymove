'use client';
import React, { type FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { useResetPassword } from '@/hooks/useResetPassword';
import { Toaster } from 'react-hot-toast';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
const ForgotPassword: FC = () => {
  const { email, setEmail, loading, error, success, handleSubmitResetPassword } =
    useResetPassword();
  const session = useSession();
  const router = useRouter();
  if (!session) {
    router.push('/');
  }
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <Card className="w-full max-w-md p-6 flex flex-col justify-center h-[32rem]">
        <CardHeader>
          <CardTitle>Forgot your password?</CardTitle>
          <CardDescription>
            Enter your email address below to reset your password for logging into your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmitResetPassword} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="mb@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <CardFooter className="flex-col gap-2 mt-4 ">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Reset Password'}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
        <Toaster position="top-right" />
      </Card>
    </div>
  );
};

export default ForgotPassword;
