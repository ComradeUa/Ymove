import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
export const useResetPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const handleSubmitResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await authClient.requestPasswordReset({
          email: email,
          redirectTo: `/auth/reset-password`,
        
      });
      setSuccess(true);
      toast.success('Check your email');
    } catch (err: any) {
      setError(err?.message || 'Error when resetting password');
      toast.error('Error when resetting password')
    } finally {
      setLoading(false);
    }
  };
  return { email, setEmail, loading, error, success, handleSubmitResetPassword };
};
