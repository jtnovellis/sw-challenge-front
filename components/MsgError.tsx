import Link from 'next/link';
import React from 'react';

export default function MsgError() {
  return (
    <div className='flex justify-center items-center mt-[25rem]'>
      <p>
        Ups! An error has ocurred.{' '}
        <Link href='/' className='underline text-blue-700'>
          Go to Home
        </Link>
      </p>
    </div>
  );
}
