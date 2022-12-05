import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface PaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  next: string | null;
  previous: string | null;
}

export default function Pagination({
  page,
  setPage,
  next,
  previous,
}: PaginationProps) {
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  useEffect(() => {
    if (next) {
      setHasNext(false);
    } else {
      setHasNext(true);
    }
    if (previous) {
      setHasPrevious(false);
    } else {
      setHasPrevious(true);
    }
  }, [next, previous]);

  return (
    <div className='border border-white rounded-lg w-36 mx-auto mt-20 flex justify-between items-center p-2'>
      <button
        disabled={hasPrevious}
        name='decrement'
        onClick={() => setPage((prev) => prev - 1)}
        className='border border-slate-500 rounded-lg py-1 px-4'
      >
        -
      </button>
      <span>{page}</span>
      <button
        disabled={hasNext}
        name='increment'
        onClick={() => setPage((prev) => prev + 1)}
        className='border border-slate-500 rounded-lg py-1 px-4'
      >
        +
      </button>
    </div>
  );
}
