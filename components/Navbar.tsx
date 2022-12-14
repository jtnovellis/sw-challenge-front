import { IconMenu2, IconX } from '@tabler/icons';
import Link from 'next/link';
import React, { useState } from 'react';

const pages = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'People',
    link: '/people',
  },
  {
    label: 'Films',
    link: '/films',
  },
  {
    label: 'Starships',
    link: '/starships',
  },
  {
    label: 'Planets',
    link: '/planets',
  },
  {
    label: 'Vehicles',
    link: '/vehicles',
  },
  {
    label: 'Species',
    link: '/species',
  },
];

export default function Navbar() {
  const [isDropped, setIsDropped] = useState(false);
  const routes = pages.map((route) => {
    return (
      <li key={route.label} className='p-4 md:p-2'>
        <Link href={route.link} onClick={() => setIsDropped((prev) => !prev)}>
          {route.label}
        </Link>
      </li>
    );
  });

  return (
    <header className='p-4 fixed top-0 sm:p-6 w-full bg-black z-20'>
      <nav className='border border-white rounded-lg p-3 sm:p-5 flex justify-between items-center shadow-2xl lg:max-w-6xl md:mx-auto'>
        <p className='font-extrabold text-3xl'>StarWars</p>
        <div className='lg:hidden pt-1'>
          {isDropped ? (
            <div className='fixed top-0 left-0 w-screen h-screen bg-black p-7'>
              <div className='flex justify-between items-center mb-11'>
                <p className='font-extrabold text-3xl'>StarWars</p>
                <button onClick={() => setIsDropped((prev) => !prev)}>
                  <IconX />
                </button>
              </div>
              <div className=''>
                <ul className='font-bold text-xl'>{routes}</ul>
              </div>
            </div>
          ) : (
            <button onClick={() => setIsDropped((prev) => !prev)}>
              <IconMenu2 />
            </button>
          )}
        </div>
        <ul className='hidden lg:flex font-bold text-xl m-0'>{routes}</ul>
      </nav>
    </header>
  );
}
