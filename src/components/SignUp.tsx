'use client';

import React, { type FC } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
  CardAction,
} from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { signIn } from '@/lib/auth-client';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Github } from 'lucide-react';
const SignUp: FC = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
    error,
    loading,
  } = useAuth('signUp');
  return (
    <Card className="w-full max-w-xl mx-auto p-10 mt-15 min-h-[500px]">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Enter your registration details</CardDescription>
        <CardAction>
          <Link href={'/auth/sign-in'}>
            <Button variant="link">Sign In</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button type="submit" className="w-full" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Registration...' : 'Sign up'}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={async () =>
            await signIn.social({
              provider: 'github',
            })
          }>
          Sign up with GitHub <Github />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
