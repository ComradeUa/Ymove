'use client';
import { useSession, authClient } from '@/lib/auth-client';
import { Inter, Poppins } from 'next/font/google';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { type FC } from 'react';

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
});

const Header: FC = () => {
  const { data: session, isPending, error } = useSession();
  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    await authClient.signOut();
    redirect('/');
  };
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className={`${poppins.className} text-2xl font-bold}`}>YMovies</div>
        <nav className={`${inter.className} flex space-x-6`}>
          <Link href={'/'}>Home</Link>
          <Link href={'/movie/favorites'}>Favorites</Link>
          {session ? (
            <>
              <p>Welcome, {session.user.name ?? 'User'}</p>
              <Link href="/" onClick={handleSignOut} className="hover:underline text-red-400">
                Sign out
              </Link>
            </>
          ) : (
            <Link href="/auth/sign-up" className="hover:underline">
              Sign Up
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
