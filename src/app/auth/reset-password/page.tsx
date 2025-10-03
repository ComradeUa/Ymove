import ResetPassword from '@/components/ResetPassword';
import { Suspense } from 'react';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p className="text-center mt-5">Loading...</p>}>
      <ResetPassword />
    </Suspense>
  );
}
