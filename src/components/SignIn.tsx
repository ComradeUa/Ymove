'use client';

import React, { type FC } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import Link from 'next/link';
import { Github } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { signIn } from '@/lib/auth-client';
import { Toaster } from 'react-hot-toast';
const SignIn: FC = () => {
  const { setEmail, setPassword, handleSubmit, error } = useAuth('signIn');
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <Card className="w-full max-w-md p-6 flex flex-col justify-center h-[500px]">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
          <CardAction>
            <Link href={'/auth/sign-up'}>
              <Button variant="link">Sign Up</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-start gap-4">
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="mb@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            Login
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={async () =>
              await signIn.social({
                provider: 'github',
              })
            }>
            Login with Github <Github />
          </Button>
        </CardFooter>
        <Toaster position="top-right" reverseOrder={false} />
      </Card>
    </div>
  );
};

export default SignIn;
