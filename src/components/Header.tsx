import { Inter, Poppins } from 'next/font/google';
import Link from 'next/link';
import React, { FC } from 'react';

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
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className={`${poppins.className} text-2xl font-bold}`}>YMovies</div>
        <nav className={`${inter.className} flex space-x-6`}>
          <Link href={'/'}>Home</Link>
          <Link href={'/movie'}>Movies</Link>
          <Link href={'/movie/favorites'}>Favorites</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
