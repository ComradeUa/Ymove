'use client';
import { useSession, authClient } from '@/lib/auth-client';
import { Inter, Poppins } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, type FC } from 'react';

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
  const router = useRouter();
  const { data: session, isPending, error } = useSession();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    await authClient.signOut();
    window.location.reload();
  };

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className={`${poppins.className} text-2xl font-bold leading-none`}>YMovies</div>
        <button
          className="sm:hidden flex flex-col justify-between w-6 h-6 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}>
          <span
            className={`block h-0.5 w-full bg-white transition-transform duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-white transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-white transition-transform duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
        <nav
          className={`${inter.className} 
            ${menuOpen ? 'block' : 'hidden'} 
            sm:flex sm:items-center sm:space-x-6`}>
          <Link href="/" className="block py-2 sm:py-0 hover:underline">
            Home
          </Link>
          <Link href="/movie/favorites" className="block py-2 sm:py-0 hover:underline">
            Favorites
          </Link>
          {session ? (
            <>
              <p className="block py-2 sm:py-0">Welcome, {session.user.name ?? 'User'}</p>
              <Link
                href="/"
                onClick={handleSignOut}
                className="block py-2 sm:py-0 text-red-400 hover:underline">
                Sign out
              </Link>
            </>
          ) : (
            <Link href="/auth/sign-up" className="block py-2 sm:py-0 hover:underline">
              Sign Up
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
