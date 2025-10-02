import { useState } from 'react';
import { authClient } from '@/lib/auth-client';

type AuthMode = 'signIn' | 'signUp';

export const useAuth = (mode: AuthMode) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'signUp' && password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    try {
      if (mode === 'signUp') {
        const { error } = await authClient.signUp.email({
          name,
          email,
          password,
          callbackURL: '/',
        });

        if (error) {
          console.error(error);
          setError(error.message || 'Failed to sign up');
        } else {
          window.location.href = '/';
        }
      } else {
        const { error } = await authClient.signIn.email({
          email,
          password,
          callbackURL: '/',
        });

        if (error) {
          console.error(error);
          setError(error.message || 'Failed to sign in');
        } else {
          window.location.href = '/';
        }
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return {
    // shared
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleSubmit,

    // only for signup
    name,
    setName,
    confirmPassword,
    setConfirmPassword,
  };
};
