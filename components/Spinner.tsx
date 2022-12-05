import React from 'react';

export default function Spinner() {
  return (
    <div className='flex justify-center items-center mt-[25rem]'>
      <div className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full'></div>
    </div>
  );
}
