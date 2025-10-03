import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type AuthMode = 'signIn' | 'signUp';

export const useAuth = (mode: AuthMode) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'signUp' && password !== confirmPassword) {
      toast.error("Passwords don't match");
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
        });

        if (error) {
          setError(error.message || 'Failed to sign up');
          toast.error(error.message || 'Failed to sign up');
        } else {
          toast.success('User created');
          router.push('/'); 
        }
      } else {
        const { error } = await authClient.signIn.email({
          email,
          password,
        });

        if (error) {
           setError(error.message || 'Failed to sign in');
          toast.error("Incorrect email or password");
        } else {
          toast.success('Signed in successfully');
          router.push('/'); 
        }
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleSubmit,
    name,
    setName,
    confirmPassword,
    setConfirmPassword,
  };
};
