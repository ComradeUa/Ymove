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
const SignIn: FC = () => {
  const { setEmail, setPassword, handleSubmit, error } = useAuth('signIn');
  return (
    <Card className="w-full max-w-xl mx-auto p-15 mt-15 min-h-[500px]">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
        <CardAction>
          <Link href={'/auth/sign-up'}>
            <Button variant="link">Sign Up</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
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
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </a>
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </CardFooter>
    </Card>
  );
};

export default SignIn;
