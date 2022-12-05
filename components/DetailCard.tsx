import { IconChevronLeft } from '@tabler/icons';
import { useRouter } from 'next/router';
import React from 'react';

interface DetailCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  route: string;
}

export default function DetailCard({
  title,
  subtitle,
  children,
  route,
}: DetailCardProps) {
  const router = useRouter();
  return (
    <div className='border border-white rounded-lg'>
      <div className='border-b px-3 py-3 flex justify-between items-center'>
        <div>
          <h1 className='font-bold text-lg'>{title}</h1>
          <p className='text-sm'>{subtitle}</p>
        </div>
        <button
          onClick={() => router.push(route)}
          className='flex border border-white rounded-lg p-2'
        >
          <IconChevronLeft /> Go Back
        </button>
      </div>
      <div className='p-3'>{children}</div>
    </div>
  );
}
