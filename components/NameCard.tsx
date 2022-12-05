import Link from 'next/link';
import { IconChevronRight } from '@tabler/icons';

interface NameCardProps {
  id: string;
  name: string;
}

export default function NameCard({ id, name }: NameCardProps) {
  return (
    <Link href={`/people/${id}`}>
      <div className='bg-slate-900 rounded-lg flex justify-between py-4 md:py-6 px-2 m-3 max-w-xl w-[18rem]'>
        <span>{name}</span>
        <IconChevronRight />
      </div>
    </Link>
  );
}
